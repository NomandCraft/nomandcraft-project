<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCampers } from '@/api.js'

const route = useRoute()
const camper = ref(null)

onMounted(async () => {
  try {
    const camperId = route.params.id
    const campers = await fetchCampers()
    camper.value = campers.find((c) => c._id === camperId)
  } catch (error) {
    console.error('Cambere download error:', error)
  }
})
</script>

<template>
  <div v-if="camper">
    <h1>{{ camper.name }}</h1>
    <p>{{ camper.description }}</p>
    <img :src="camper.image" alt="Camper Image" />
  </div>
  <div v-else>
    <p>Data load...</p>
  </div>
</template>
