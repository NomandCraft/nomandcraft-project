import { defineStore } from 'pinia'
import { fetchCampers } from '@/utils/api.js'

export const useCampersStore = defineStore('campers', {
  state: () => ({ campers: [] }),
  actions: {
    async loadCampers() {
      this.campers = (await fetchCampers()).campers || []
    },
  },
})
