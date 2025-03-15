<script setup>
import { ref, onMounted } from 'vue'
import CamperCard from '@/components/CamperCard.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { fetchCampers } from '@/api.js'

const campersData = ref(null) // ✅ Теперь храним весь объект
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await fetchCampers()
    campersData.value = data || {} // ✅ Убедимся, что объект не `undefined`
  } catch (error) {
    console.error('Campers loading error:', error)
    campersData.value = { campers: [] } // ✅ Безопасное значение
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="flex">
    <FilterSidebar />
    <div class="grid grid-cols-3 gap-6 p-8" v-if="campersData?.campers?.length">
      <CamperCard v-for="camper in campersData.campers" :key="camper._id" :camper="camper" />
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>No campers available.</p>
    </div>

    <!-- ✅ Отображаем количество кемперов и номер страницы -->
    <p v-if="campersData">
      Showing {{ campersData.campers.length }} of {{ campersData.totalItems }} campers.
    </p>
  </div>
</template>
