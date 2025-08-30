import { defineStore } from "pinia";
import { getCampers } from "@/api";

export const useCampersStore = defineStore("campers", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetch(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        this.items = await getCampers(params);
      } catch (e) {
        this.error = e?.message || "Failed to load campers";
      } finally {
        this.loading = false;
      }
    },
  },
});
