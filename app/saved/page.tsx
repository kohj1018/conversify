"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trash2, Edit3, Check, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { useSentenceStore, Sentence } from "@/lib/store"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SavedSentencesPage() {
  const { sentences, deleteSentence, updateSentence } = useSentenceStore()
  const [isClient, setIsClient] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedSentence, setEditedSentence] = useState<Partial<Sentence>>({})

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleEditStart = (sentence: Sentence) => {
    setEditingId(sentence.id)
    setEditedSentence({
      korean: sentence.korean,
      english: sentence.english,
      japanese: sentence.japanese,
    })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditedSentence({})
  }

  const handleEditSave = (id: string) => {
    updateSentence(id, editedSentence)
    toast.success("문장이 성공적으로 수정되었습니다.")
    handleEditCancel()
  }

  const handleContentChange = (field: keyof Omit<Sentence, 'id' | 'createdAt'>, value: string) => {
    setEditedSentence(prev => ({ ...prev, [field]: value }))
  }

  // Hydration 오류를 피하기 위해 클라이언트에서만 렌더링
  if (!isClient) {
    return null
  }

  const handleDelete = (id: string) => {
    deleteSentence(id)
    toast.error("문장이 삭제되었습니다.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">저장된 문장</h1>
            </div>
            <p className="text-gray-600 text-lg">저장한 문장들을 클릭하여 번역을 확인해보세요</p>
            <Badge variant="secondary" className="text-sm">
              총 {sentences.length}개의 문장
            </Badge>
          </div>

          {/* Saved Sentences */}
          {sentences.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">저장된 문장이 없습니다</h3>
                <p className="text-gray-600">번역 페이지에서 문장을 저장해보세요!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sentences.map((sentence) => (
                <Card key={sentence.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {editingId === sentence.id ? (
                          <Textarea
                            value={editedSentence.korean}
                            onChange={(e) => handleContentChange('korean', e.target.value)}
                            className="text-lg"
                          />
                        ) : (
                          <CardTitle className="text-lg leading-relaxed text-gray-900">{sentence.korean}</CardTitle>
                        )}
                        <CardDescription className="mt-2">저장일: {new Date(sentence.createdAt).toLocaleDateString()}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        {editingId === sentence.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleEditSave(sentence.id)} className="text-green-600 hover:text-green-700">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleEditCancel} className="text-gray-600 hover:text-gray-800">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => handleEditStart(sentence)}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(sentence.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingId === sentence.id ? (
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label className="text-sm font-medium mb-1 flex items-center gap-1">🇺🇸 영어</Label>
                          <Textarea value={editedSentence.english} onChange={(e) => handleContentChange('english', e.target.value)} />
                        </div>
                        <div>
                          <Label className="text-sm font-medium mb-1 flex items-center gap-1">🇯🇵 일본어</Label>
                          <Textarea value={editedSentence.japanese} onChange={(e) => handleContentChange('japanese', e.target.value)} />
                        </div>
                      </div>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="translations" className="border-none">
                          <AccordionTrigger className="hover:no-underline py-2">
                            <span className="text-sm text-gray-600">번역 보기</span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-6 pt-4">
                            {/* English Translation */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🇺🇸</span>
                                <h4 className="font-medium text-gray-900">영어</h4>
                              </div>
                              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg leading-relaxed">
                                {sentence.english}
                              </p>
                            </div>

                            {/* Japanese Translation */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🇯🇵</span>
                                <h4 className="font-medium text-gray-900">일본어</h4>
                              </div>
                              <p className="text-gray-700 bg-red-50 p-4 rounded-lg leading-relaxed">
                                {sentence.japanese}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
