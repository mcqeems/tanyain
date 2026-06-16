import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useQuizStore } from "../store/useQuizStore";
import { fetchQuestions } from "../api/opentdb";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export const LoginView = () => {
  const navigate = useNavigate();
  const { setUsername, setQuestions, startQuiz } = useQuizStore();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setUsername(name);
    const qs = await fetchQuestions(10);
    setQuestions(qs);
    startQuiz();
    setLoading(false);
    navigate("/quiz");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="mb-4 text-[38px] font-bold leading-[1.5] tracking-tight">[TanyaIn!]</div>
          <div className="text-[16px] text-mute">Random Quiz Games</div>
        </motion.div>

        <Card dark={true}>
          <form onSubmit={handleStart} className="flex flex-col gap-6">
            <div>
              <label className="mb-2 block text-[16px] font-bold text-ash">[+] Enter your name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Player"
                disabled={loading}
                className="bg-surface-dark-elevated text-on-primary border-hairline-strong focus:bg-surface-dark focus:border-ash"
              />
            </div>
            <Button type="submit" variant="secondary" disabled={!name.trim() || loading}>
              {loading ? "Loading..." : "Start Game →"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
