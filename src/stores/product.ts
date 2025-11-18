import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    groups: [],
    promotions: [],
  }),
  actions: {
    async fetchCategories() {
      const response = await axios.get('http://localhost:3000/api/categories').then((res) => {
        this.categories = res.data
      })
      return response
    },
  },
})
