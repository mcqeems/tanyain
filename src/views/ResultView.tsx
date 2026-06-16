import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useQuizStore } from '../store/useQuizStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export const ResultView = () => {
  const navigate = useNavigate()
  const { username, score, questions, status, reset } = useQuizStore()

  useEffect(() => {
    if (status !== 'finished') {
      navigate('/')
    }
  }, [status, navigate])

  const handleRestart = () => {
    reset()
    navigate('/')
  }

  if (status !== 'finished') return null

  return (
    <div className="mx-auto max-w-[960px] px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-12 border-b border-hairline pb-4 text-center">
          <h1 className="text-[38px] font-bold text-ink">Quiz Completed</h1>
          <p className="text-[16px] text-mute">Good job, {username}!</p>
        </div>

        <Card dark={true} className="mx-auto max-w-lg mb-12">
          <div className="mb-6 border-b border-hairline-strong pb-4">
            <h2 className="text-[16px] font-bold text-on-primary">[x] Results Summary</h2>
          </div>
          
          <div className="flex flex-col gap-4 text-[16px]">
            <div className="flex justify-between">
              <span className="text-ash">Total Questions</span>
              <span className="font-bold text-on-primary">{questions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ash">Answered</span>
              <span className="font-bold text-on-primary">{score.answered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ash">Correct</span>
              <span className="font-bold text-success">{score.correct}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ash">Wrong</span>
              <span className="font-bold text-danger">{score.wrong}</span>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button onClick={handleRestart}>Play Again →</Button>
        </div>
      </motion.div>
    </div>
  )
}
