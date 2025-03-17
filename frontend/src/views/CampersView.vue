<script setup>
import { ref, onMounted } from 'vue'
import CamperCard from '@/components/CamperCard.vue'
import { fetchCampers } from '@/api.js'

const campers = ref([])

onMounted(async () => {
  const data = await fetchCampers()
  campers.value = data?.campers || []
})
</script>

<template>
  <div class="container">
    <h1>Available Campers</h1>
    <div class="grid">
      <CamperCard v-for="camper in campers" :key="camper._id" :camper="camper" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
