import { defineStore } from 'pinia'
import type { User } from "@/api"

export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    user: null as unknown as User,
    ethereum: null as unknown as any,
    accessToken: ''
  }),
  getters: {
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setProvider(ethereum: any) {
      this.ethereum = ethereum
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
    }
  }
})
