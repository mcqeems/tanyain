import { Routes, Route } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { QuizView } from "./views/QuizView";
import { ResultView } from "./views/ResultView";

function App() {
  return (
    <div className="min-h-screen bg-canvas text-body selection:bg-ink selection:text-canvas">
      <nav className="border-b border-hairline px-6 py-4">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <div className="flex flex-col font-bold leading-tight">
            <span className="text-ink">TanyaIn!</span>
            <span className="text-mute text-[10px] mt-1">QUIZ</span>
          </div>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/result" element={<ResultView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
