import { User } from '@/models/user.model'
import { getUserProfile } from '@/services/user.service'
import { getCookie } from 'cookies-next'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
  restoreUser: () => Promise<void>
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      restoreUser: async () => {
        const token = getCookie('token')

        if (!token) {
          set({ user: null })
          return
        }

        if (useUserStore.getState().user) return

        const response = await getUserProfile()

        if (response.data) {
          const { user } = response.data
          set({ user })
        }

        if (response.error) {
          console.error('Error restaurando usuario:', response.error)
          set({ user: null })
        }
        return
      },
    }),
    { name: 'user' }
  )
)
