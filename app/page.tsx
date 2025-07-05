"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Languages, Edit3, Check } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

export default function TranslatePage() {
  const [koreanText, setKoreanText] = useState("")
  const [englishText, setEnglishText] = useState("")
  const [japaneseText, setJapaneseText] = useState("")
  const [japanesePronunciation, setJapanesePronunciation] = useState("")
  const [isEditingEnglish, setIsEditingEnglish] = useState(false)
  const [isEditingJapanese, setIsEditingJapanese] = useState(false)
  const [isEditingPronunciation, setIsEditingPronunciation] = useState(false)
  const [hasTranslated, setHasTranslated] = useState(false)
  const { toast } = useToast()

  const handleTranslate = () => {
    if (!koreanText.trim()) return

    // Mock translation - user will implement with Gemma
    setEnglishText("Hello, how are you today? I'm doing well, thank you.")
    setJapaneseText("こんにちは、今日はいかがですか？私は元気です、ありがとう。")
    setJapanesePronunciation("곤니치와, 쿄우와 이카가데스카? 와타시와 겐키데스, 아리가토우.")
    setHasTranslated(true)
  }

  const handleSave = () => {
    if (!koreanText.trim() || !englishText.trim() || !japaneseText.trim()) {
      toast({
        title: "저장 실패",
        description: "모든 번역이 완료된 후 저장할 수 있습니다.",
        variant: "destructive",
      })
      return
    }

    // Mock save functionality - user will implement
    toast({
      title: "저장 완료!",
      description: "문장이 '내 저장된 문장'에 추가되었습니다.",
    })
  }

  const handleEditToggle = (field: "english" | "japanese" | "pronunciation") => {
    switch (field) {
      case "english":
        setIsEditingEnglish(!isEditingEnglish)
        break
      case "japanese":
        setIsEditingJapanese(!isEditingJapanese)
        break
      case "pronunciation":
        setIsEditingPronunciation(!isEditingPronunciation)
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Languages className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">영어 회화 학습</h1>
            </div>
            <p className="text-gray-600 text-lg">일상 대화 문장을 입력하고 영어와 일본어로 번역해보세요</p>
          </div>

          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                한국어 문장 입력
              </CardTitle>
              <CardDescription>일상 대화에서 사용할 수 있는 문장을 1-3줄로 작성해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="예: 안녕하세요, 오늘 날씨가 정말 좋네요. 산책하기 딱 좋은 날씨인 것 같아요."
                value={koreanText}
                onChange={(e) => setKoreanText(e.target.value)}
                className="min-h-[100px] text-lg"
              />
              <Button onClick={handleTranslate} disabled={!koreanText.trim()} className="w-full" size="lg">
                <Languages className="h-4 w-4 mr-2" />
                번역하기
              </Button>
            </CardContent>
          </Card>

          {/* Translation Results */}
          {hasTranslated && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* English Translation */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">🇺🇸 영어 번역</span>
                    <Button variant="ghost" size="sm" onClick={() => handleEditToggle("english")}>
                      {isEditingEnglish ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditingEnglish ? (
                    <Textarea
                      value={englishText}
                      onChange={(e) => setEnglishText(e.target.value)}
                      className="min-h-[80px]"
                    />
                  ) : (
                    <p className="text-lg leading-relaxed">{englishText}</p>
                  )}
                </CardContent>
              </Card>

              {/* Japanese Translation */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">🇯🇵 일본어 번역</span>
                    <Button variant="ghost" size="sm" onClick={() => handleEditToggle("japanese")}>
                      {isEditingJapanese ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditingJapanese ? (
                    <Textarea
                      value={japaneseText}
                      onChange={(e) => setJapaneseText(e.target.value)}
                      className="min-h-[60px]"
                    />
                  ) : (
                    <p className="text-lg leading-relaxed">{japaneseText}</p>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-600">한국어 발음</Label>
                      <Button variant="ghost" size="sm" onClick={() => handleEditToggle("pronunciation")}>
                        {isEditingPronunciation ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                      </Button>
                    </div>
                    {isEditingPronunciation ? (
                      <Input
                        value={japanesePronunciation}
                        onChange={(e) => setJapanesePronunciation(e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{japanesePronunciation}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Save Button */}
          {hasTranslated && (
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <Button onClick={handleSave} className="w-full" size="lg" variant="default">
                  <Save className="h-4 w-4 mr-2" />내 저장된 문장에 추가하기
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
