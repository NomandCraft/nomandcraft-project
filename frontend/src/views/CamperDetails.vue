<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCampers } from '@/api.js'

const route = useRoute()
const camper = ref(null)

onMounted(async () => {
  try {
    const camperId = route.params.id
    const data = await fetchCampers()
    camper.value = data.campers.find((c) => c._id === camperId) || null
  } catch (error) {
    console.error('Camper loading error:', error)
  }
})
</script>

<template>
  <div v-if="camper" class="camper-details">
    <h1>{{ camper.name }}</h1>
    <p>{{ camper.description }}</p>
    <img :src="camper.images[0]" alt="Camper Image" v-if="camper.images.length" />
  </div>
  <div v-else>
    <p>Data loading...</p>
  </div>
</template>

<style scoped>
.camper-details {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
