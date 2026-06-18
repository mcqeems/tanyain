import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { AuthView } from "./views/AuthView"
import { LoginView } from "./views/LoginView"
import { QuizView } from "./views/QuizView"
import { ResultView } from "./views/ResultView"

function App() {
  const currentUser = useAuthStore((s) => s.currentUser)

  return (
    <div className="min-h-screen bg-canvas text-body selection:bg-ink selection:text-canvas">
      <nav className="border-b border-hairline px-6 py-4">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <div className="flex flex-col font-bold leading-tight">
            <span className="text-ink">TanyaIn!</span>
            <span className="text-mute text-[10px] mt-1">QUIZ</span>
          </div>
          {currentUser && (
            <div className="text-[14px] text-mute">
              [{currentUser}]
            </div>
          )}
        </div>
      </nav>
      <main>
        <Routes>
          <Route
            path="/auth"
            element={currentUser ? <Navigate to="/" replace /> : <AuthView />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LoginView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <ResultView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
