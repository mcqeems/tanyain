import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useAuthStore } from "../store/useAuthStore"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"

type AuthMode = "login" | "register"

export const AuthView = () => {
  const { login, register } = useAuthStore()
  const [mode, setMode] = useState<AuthMode>("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result =
      mode === "login" ? await login(username, password) : await register(username, password)

    if (result) {
      setError(result)
    }

    setLoading(false)
  }

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login")
    setError("")
    setUsername("")
    setPassword("")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 text-[38px] font-bold leading-[1.5] tracking-tight">[TanyaIn!]</div>
          <div className="text-[16px] text-mute">All Rounder Quiz Games</div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
            transition={{ duration: 0.25 }}
          >
            <Card dark={true}>
              <div className="mb-6 border-b border-hairline-strong pb-4">
                <h2 className="text-[16px] font-bold text-on-primary">
                  {mode === "login" ? "[+] Login" : "[+] Register"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="mb-2 block text-[14px] font-bold text-ash">Username</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    disabled={loading}
                    className="bg-surface-dark-elevated text-on-primary border-hairline-strong focus:bg-surface-dark focus:border-ash"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-bold text-ash">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="bg-surface-dark-elevated text-on-primary border-hairline-strong focus:bg-surface-dark focus:border-ash"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[14px] text-danger"
                    >
                      [-] {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  variant="secondary"
                  disabled={!username.trim() || !password.trim() || loading}
                  className="mt-2"
                >
                  {loading ? "Loading..." : mode === "login" ? "Login →" : "Create Account →"}
                </Button>
              </form>

              <div className="mt-6 border-t border-hairline-strong pt-4 text-center">
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-[14px] text-ash underline transition-colors hover:text-on-primary"
                >
                  {mode === "login"
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
