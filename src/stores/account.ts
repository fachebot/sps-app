import { defineStore } from 'pinia'

export const useAccountStore = defineStore({
  id: 'account',
  state: () => ({
    ethereum: null
  }),
  getters: {
  },
  actions: {
    setupWallet(ethereum: any) {
      this.ethereum = ethereum;
    }
  }
})
