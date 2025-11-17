import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 0,
  }),
  actions: {
    updateCount(newCount) {
      this.count = newCount
    },
  },
  getters: {
    getCount: (state) => state.count,
  },
})
