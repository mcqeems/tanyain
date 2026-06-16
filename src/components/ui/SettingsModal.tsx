import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { useQuizStore } from '../../store/useQuizStore'
import { Card } from './Card'
import { Button } from './Button'

const CATEGORIES = [
  { id: '', name: 'Any Category' },
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Books' },
  { id: 11, name: 'Film' },
  { id: 12, name: 'Music' },
  { id: 15, name: 'Video Games' },
  { id: 18, name: 'Computers' },
  { id: 21, name: 'Sports' },
  { id: 23, name: 'History' },
]

const DIFFICULTIES = [
  { id: '', name: 'Any Difficulty' },
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
]

const TYPES = [
  { id: '', name: 'Any Type' },
  { id: 'multiple', name: 'Multiple Choice' },
  { id: 'boolean', name: 'True / False' },
]

export const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { config, setConfig } = useQuizStore()

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md z-10"
        >
          <Card dark={true} className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-hairline-strong pb-4">
              <h2 className="text-[16px] font-bold text-on-primary">[+] Quiz Settings</h2>
              <button onClick={onClose} className="text-ash hover:text-on-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-[14px] font-bold text-ash">Amount of Questions</label>
                <select 
                  value={config.amount}
                  onChange={(e) => setConfig({ ...config, amount: Number(e.target.value) })}
                  className="flex h-10 w-full rounded-sm border border-hairline bg-surface-dark-elevated px-3 py-2 text-[16px] text-on-primary focus:outline-none"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={50}>50 Questions</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[14px] font-bold text-ash">Category</label>
                <select 
                  value={config.category}
                  onChange={(e) => setConfig({ ...config, category: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-hairline bg-surface-dark-elevated px-3 py-2 text-[16px] text-on-primary focus:outline-none"
                >
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[14px] font-bold text-ash">Difficulty</label>
                <select 
                  value={config.difficulty}
                  onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-hairline bg-surface-dark-elevated px-3 py-2 text-[16px] text-on-primary focus:outline-none"
                >
                  {DIFFICULTIES.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[14px] font-bold text-ash">Type</label>
                <select 
                  value={config.type}
                  onChange={(e) => setConfig({ ...config, type: e.target.value })}
                  className="flex h-10 w-full rounded-sm border border-hairline bg-surface-dark-elevated px-3 py-2 text-[16px] text-on-primary focus:outline-none"
                >
                  {TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>

            <Button variant="secondary" onClick={onClose} className="mt-2 border-hairline-strong bg-surface-dark-elevated text-on-primary hover:bg-surface-dark">
              Done
            </Button>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
