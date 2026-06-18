import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Settings, LogOut } from "lucide-react"
import { useQuizStore } from "../store/useQuizStore"
import { useAuthStore } from "../store/useAuthStore"
import { fetchQuestions } from "../api/opentdb"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { SettingsModal } from "../components/ui/SettingsModal"

export const LoginView = () => {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.currentUser)
  const logout = useAuthStore((s) => s.logout)
  const { setUsername, setQuestions, startQuiz, config } = useQuizStore()
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleStart = async (e: FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    setLoading(true)
    setUsername(currentUser)
    const qs = await fetchQuestions(config)
    setQuestions(qs)
    startQuiz()
    setLoading(false)
    navigate("/quiz")
  }

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(true)}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-surface-card text-ink hover:bg-surface-soft border border-hairline-strong transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-surface-card text-ink hover:bg-surface-soft border border-hairline-strong transition-colors"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </motion.button>
      </div>

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 text-[38px] font-bold leading-[1.5] tracking-tight">[TanyaIn!]</div>
          <div className="text-[16px] text-mute">All Rounder Quiz Games</div>
        </motion.div>

        <Card dark={true}>
          <div className="mb-6 border-b border-hairline-strong pb-4">
            <h2 className="text-[16px] font-bold text-on-primary">
              [+] Welcome, {currentUser}
            </h2>
          </div>
          <form onSubmit={handleStart} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-[14px] text-ash">
              <div className="flex justify-between">
                <span>Questions</span>
                <span className="font-bold text-on-primary">{config.amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Category</span>
                <span className="font-bold text-on-primary">{config.category || "Any"}</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty</span>
                <span className="font-bold text-on-primary">{config.difficulty || "Any"}</span>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span className="font-bold text-on-primary">{config.type || "Any"}</span>
              </div>
            </div>
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? "Loading..." : "Start Game →"}
            </Button>
          </form>
        </Card>
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}
