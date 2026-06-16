import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useQuizStore } from '../store/useQuizStore'
import { Card } from '../components/ui/Card'

export const QuizView = () => {
  const navigate = useNavigate()
  const { 
    questions, currentIdx, score, status, timeLeft, 
    answerQuestion, tick, finishQuiz 
  } = useQuizStore()

  useEffect(() => {
    if (status === 'idle') {
      navigate('/')
      return
    }
    if (status === 'finished') {
      navigate('/result')
      return
    }
    
    const timer = setInterval(() => {
      tick()
    }, 1000)
    
    return () => clearInterval(timer)
  }, [status, navigate, tick])

  useEffect(() => {
    if (status === 'playing' && timeLeft <= 0) {
      finishQuiz()
      navigate('/result')
    }
  }, [timeLeft, status, finishQuiz, navigate])

  if (questions.length === 0 || status !== 'playing') return null

  const q = questions[currentIdx]

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="mx-auto max-w-[960px] px-4 py-12 md:py-24">
      <div className="mb-12 flex items-end justify-between border-b border-hairline pb-4">
        <div>
          <div className="text-[16px] font-bold text-ink">
            Question {currentIdx + 1} / {questions.length}
          </div>
          <div className="text-[14px] text-mute">
            Answered: {score.answered}
          </div>
        </div>
        <div className="text-[16px] font-bold text-ink">
          Time: <span className={timeLeft <= 10 ? 'text-danger' : ''}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8">
            <h2 className="text-[16px] font-bold leading-[1.5] text-ink" dangerouslySetInnerHTML={{ __html: q.question }} />
          </Card>

          <div className="flex flex-col gap-4">
            {q.answers.map((ans, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => answerQuestion(ans === q.correct_answer)}
                className="flex w-full items-center gap-4 border border-hairline bg-canvas p-4 text-left transition-colors hover:bg-surface-soft"
              >
                <span className="font-bold text-mute">[{String.fromCharCode(65 + idx)}]</span>
                <span className="text-[16px] text-body" dangerouslySetInnerHTML={{ __html: ans }} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
