import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthView } from "./views/AuthView";
import { StartView } from "./views/StartView";
import { QuizView } from "./views/QuizView";
import { ResultView } from "./views/ResultView";

function App() {
  const currentUser = useAuthStore((s) => s.currentUser);

  return (
    <div className="min-h-screen bg-canvas text-body selection:bg-ink selection:text-canvas">
      <main>
        <Routes>
          <Route path="/auth" element={currentUser ? <Navigate to="/" replace /> : <AuthView />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StartView />
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
  );
}

export default App;
