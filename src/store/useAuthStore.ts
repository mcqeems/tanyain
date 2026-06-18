import { create } from "zustand"
import { persist } from "zustand/middleware"
import { hashPassword } from "../lib/hash"

interface User {
  username: string
  passwordHash: string
}

interface AuthState {
  users: User[]
  currentUser: string | null

  login: (username: string, password: string) => Promise<string | null>
  register: (username: string, password: string) => Promise<string | null>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      login: async (username, password) => {
        const { users } = get()
        const user = users.find((u) => u.username === username)
        if (!user) return "User not found"
        const hash = await hashPassword(password)
        if (user.passwordHash !== hash) return "Wrong password"
        set({ currentUser: username })
        return null
      },

      register: async (username, password) => {
        const { users } = get()
        if (users.find((u) => u.username === username)) return "Username already taken"
        if (username.trim().length < 3) return "Username must be at least 3 characters"
        if (password.length < 4) return "Password must be at least 4 characters"
        const hash = await hashPassword(password)
        set({ users: [...users, { username, passwordHash: hash }], currentUser: username })
        return null
      },

      logout: () => set({ currentUser: null }),
    }),
    {
      name: "tanya-in-auth-storage",
    },
  ),
)
