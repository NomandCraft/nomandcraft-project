<script setup>
import { ref, onMounted } from 'vue'
import CamperCard from '@/components/CamperCard.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import { getAllCampers } from '@/api'

const campers = ref([])
const loading = ref(true)

onMounted(async () => {
  campers.value = await getAllCampers()
  loading.value = false
})
</script>

<template>
  <div class="flex">
    <FilterSidebar />
    <div class="grid grid-cols-3 gap-6 p-8" v-if="!loading">
      <CamperCard v-for="camper in campers" :key="camper._id" :camper="camper" />
    </div>
    <div v-if="loading">Загрузка...</div>
  </div>
</template>
