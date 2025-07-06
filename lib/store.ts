import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Sentence {
  id: string
  korean: string
  english: string
  japanese: string
  createdAt: string
}

interface SentenceState {
  sentences: Sentence[]
  addSentence: (sentence: Omit<Sentence, 'id' | 'createdAt'>) => void
  deleteSentence: (id: string) => void
  updateSentence: (id: string, updates: Partial<Omit<Sentence, 'id' | 'createdAt'>>) => void
}

export const useSentenceStore = create<SentenceState>()(
  persist(
    (set) => ({
      sentences: [],
      addSentence: (sentence) =>
        set((state) => ({
          sentences: [
            {
              ...sentence,
              id: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
            ...state.sentences,
          ],
        })),
      deleteSentence: (id) =>
        set((state) => ({
          sentences: state.sentences.filter((s) => s.id !== id),
        })),
      updateSentence: (id, updates) =>
        set((state) => ({
          sentences: state.sentences.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
    }),
    {
      name: 'sentence-storage', // localStorage에 저장될 때 사용될 키
      storage: createJSONStorage(() => localStorage),
    }
  )
) 