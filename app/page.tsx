"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Languages, Edit3, Check, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { toast } from "sonner"
import { translate_ko_to_en, translate_en_to_ja } from "@/lib/translator"
import { useSentenceStore } from "@/lib/store"

export default function TranslatePage() {
  const [koreanText, setKoreanText] = useState("")
  const [englishText, setEnglishText] = useState("")
  const [japaneseText, setJapaneseText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTranslatingJapanese, setIsTranslatingJapanese] = useState(false)
  const [isEditingEnglish, setIsEditingEnglish] = useState(false)
  const [isEditingJapanese, setIsEditingJapanese] = useState(false)
  const [hasTranslated, setHasTranslated] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const addSentence = useSentenceStore((state) => state.addSentence)

  const handleTranslate = async () => {
    if (!koreanText.trim() || isLoading || isTranslatingJapanese) return

    setIsLoading(true)
    setHasTranslated(false)
    setEnglishText("")
    setJapaneseText("")

    try {
      const englishResult = await translate_ko_to_en(koreanText)
      setEnglishText(englishResult)
      setHasTranslated(true)

      setIsTranslatingJapanese(true)
      try {
        const japaneseResult = await translate_en_to_ja(englishResult)
        setJapaneseText(japaneseResult)
      } catch (jaError) {
        setJapaneseText("번역 오류")
        console.error("Japanese translation failed:", jaError);
        const errorMessage = jaError instanceof Error ? jaError.message : String(jaError)
        toast.error("일본어 번역 실패", {
          description: errorMessage,
        })
      } finally {
        setIsTranslatingJapanese(false)
      }
    } catch (koEnError) {
      setHasTranslated(false)
      const errorMessage = koEnError instanceof Error ? koEnError.message : "오류가 발생했습니다."
      toast.error("영어 번역 실패", {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    if (!koreanText.trim() || !englishText.trim() || !japaneseText.trim() || japaneseText === '번역 오류' || isSaving) {
      toast.error("저장 실패", {
        description: "모든 번역이 오류 없이 완료된 후 저장할 수 있습니다.",
      })
      return
    }

    setIsSaving(true)

    addSentence({
      korean: koreanText,
      english: englishText,
      japanese: japaneseText,
    })

    toast.success("저장 완료!", {
      description: "문장이 '내 저장된 문장'에 추가되었습니다.",
    })

    setTimeout(() => {
      setKoreanText("")
      setEnglishText("")
      setJapaneseText("")
      setHasTranslated(false)
      setIsSaving(false)
    }, 300)
  }

  const handleEditToggle = (field: "english" | "japanese") => {
    switch (field) {
      case "english":
        setIsEditingEnglish(!isEditingEnglish)
        break
      case "japanese":
        setIsEditingJapanese(!isEditingJapanese)
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Languages className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">회화 번역</h1>
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
                disabled={isLoading}
              />
              <Button onClick={handleTranslate} disabled={!koreanText.trim() || isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    번역 중...
                  </>
                ) : (
                  <>
                    <Languages className="h-4 w-4 mr-2" />
                    번역하기
                  </>
                )}
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
                    {!isTranslatingJapanese && hasTranslated && (
                      <Button variant="ghost" size="sm" onClick={() => handleEditToggle("japanese")}>
                        {isEditingJapanese ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 min-h-[100px] flex items-center justify-center">
                  {isTranslatingJapanese ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>일본어로 번역 중...</span>
                    </div>
                  ) : isEditingJapanese ? (
                    <Textarea
                      value={japaneseText}
                      onChange={(e) => setJapaneseText(e.target.value)}
                      className="min-h-[60px]"
                    />
                  ) : (
                    <p className="text-lg leading-relaxed">{japaneseText}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Save Button */}
          {hasTranslated && (
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <Button onClick={handleSave} className="w-full" size="lg" variant="default" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      저장 중...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      문장 저장하기
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}