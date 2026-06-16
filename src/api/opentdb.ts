import axios from 'axios'

export interface Question {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
  answers: string[]
}

interface OpenTDBResponse {
  response_code: number
  results: Omit<Question, 'answers'>[]
}

export interface QuizConfig {
  amount: number
  category: string | number
  difficulty: string
  type: string
}

export const fetchQuestions = async (config: QuizConfig): Promise<Question[]> => {
  try {
    let url = `https://opentdb.com/api.php?amount=${config.amount}`
    if (config.category) url += `&category=${config.category}`
    if (config.difficulty) url += `&difficulty=${config.difficulty}`
    if (config.type) url += `&type=${config.type}`
    
    const res = await axios.get<OpenTDBResponse>(url)
    if (res.data.response_code !== 0) {
      throw new Error('Failed to fetch questions')
    }
    return res.data.results.map((q) => {
      const answers = [...q.incorrect_answers, q.correct_answer]
      for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]]
      }
      
      const decodeHtml = (html: string) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
      }
      
      return {
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        answers: answers.map(decodeHtml)
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
