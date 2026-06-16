import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Question } from '../api/opentdb'

interface Score {
  correct: number
  wrong: number
  answered: number
}

interface QuizState {
  username: string
  questions: Question[]
  currentIdx: number
  score: Score
  status: 'idle' | 'playing' | 'finished'
  timeLeft: number
  
  setUsername: (name: string) => void
  setQuestions: (questions: Question[]) => void
  startQuiz: () => void
  answerQuestion: (isCorrect: boolean) => void
  tick: () => void
  finishQuiz: () => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      username: '',
      questions: [],
      currentIdx: 0,
      score: { correct: 0, wrong: 0, answered: 0 },
      status: 'idle', 
      timeLeft: 60,
      
      setUsername: (name) => set({ username: name }),
      
      setQuestions: (questions) => set({ 
        questions, 
        currentIdx: 0, 
        score: { correct: 0, wrong: 0, answered: 0 },
        status: 'idle',
        timeLeft: 60
      }),
      
      startQuiz: () => set({ status: 'playing', timeLeft: 60 }),
      
      answerQuestion: (isCorrect) => {
        const { currentIdx, questions, score } = get()
        const newScore = {
          correct: score.correct + (isCorrect ? 1 : 0),
          wrong: score.wrong + (!isCorrect ? 1 : 0),
          answered: score.answered + 1
        }
        
        if (currentIdx + 1 >= questions.length) {
          set({ score: newScore, status: 'finished' })
        } else {
          set({ score: newScore, currentIdx: currentIdx + 1 })
        }
      },
      
      tick: () => {
        const { timeLeft, status } = get()
        if (status !== 'playing') return
        if (timeLeft <= 1) {
          set({ timeLeft: 0, status: 'finished' })
        } else {
          set({ timeLeft: timeLeft - 1 })
        }
      },
      
      finishQuiz: () => set({ status: 'finished' }),
      
      reset: () => set({ 
        questions: [], 
        currentIdx: 0, 
        score: { correct: 0, wrong: 0, answered: 0 }, 
        status: 'idle', 
        timeLeft: 60 
      })
    }),
    {
      name: 'tanya-in-quiz-storage',
    }
  )
)
