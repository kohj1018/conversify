"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trash2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

// Mock data - user will replace with real data
const mockSavedSentences = [
  {
    id: 1,
    korean: "안녕하세요, 오늘 날씨가 정말 좋네요. 산책하기 딱 좋은 날씨인 것 같아요.",
    english: "Hello, the weather is really nice today. It seems like perfect weather for a walk.",
    japanese: "こんにちは、今日は本当にいい天気ですね。散歩するのにちょうどいい天気のようです。",
    pronunciation: "곤니치와, 쿄우와 혼토우니 이이 텐키데스네. 산포스루노니 쵸우도이이 텐키노요우데스.",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    korean: "실례합니다, 지하철역이 어디에 있나요?",
    english: "Excuse me, where is the subway station?",
    japanese: "すみません、地下鉄の駅はどこにありますか？",
    pronunciation: "스미마센, 치카테츠노 에키와 도코니 아리마스카?",
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    korean: "이 음식 정말 맛있어요! 레시피를 알려주실 수 있나요?",
    english: "This food is really delicious! Could you tell me the recipe?",
    japanese: "この料理は本当においしいです！レシピを教えていただけませんか？",
    pronunciation: "코노 료우리와 혼토우니 오이시이데스! 레시피오 오시에테 이타다케마센카?",
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    korean: "죄송해요, 늦었어요. 교통이 너무 복잡했어요.",
    english: "I'm sorry, I'm late. The traffic was too heavy.",
    japanese: "すみません、遅れました。交通が複雑すぎました。",
    pronunciation: "스미마센, 오쿠레마시타. 코우츠우가 후쿠자츠스기마시타.",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    korean: "커피 한 잔 주세요. 설탕은 빼고 우유만 조금 넣어주세요.",
    english: "One cup of coffee, please. No sugar, just a little milk.",
    japanese: "コーヒーを一杯ください。砂糖は抜きで、ミルクを少しだけ入れてください。",
    pronunciation: "코-히-오 이파이 쿠다사이. 사토우와 누키데, 미루쿠오 스코시다케 이레테 쿠다사이.",
    createdAt: "2024-01-11",
  },
]

export default function SavedSentencesPage() {
  const [savedSentences, setSavedSentences] = useState(mockSavedSentences)

  const handleDelete = (id: number) => {
    setSavedSentences((prev) => prev.filter((sentence) => sentence.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Conversify - 저장된 문장</h1>
            </div>
            <p className="text-gray-600 text-lg">저장한 문장들을 클릭하여 번역을 확인해보세요</p>
            <Badge variant="secondary" className="text-sm">
              총 {savedSentences.length}개의 문장
            </Badge>
          </div>

          {/* Saved Sentences */}
          {savedSentences.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">저장된 문장이 없습니다</h3>
                <p className="text-gray-600">번역 페이지에서 문장을 저장해보세요!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedSentences.map((sentence) => (
                <Card key={sentence.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-relaxed text-gray-900">{sentence.korean}</CardTitle>
                        <CardDescription className="mt-2">저장일: {sentence.createdAt}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sentence.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
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
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600 mb-1">한국어 발음:</p>
                              <p className="text-sm text-gray-800">{sentence.pronunciation}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
