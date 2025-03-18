<script setup>
import { ref, onMounted } from 'vue'
import { fetchCategories } from '@/utils/api.js'

const categories = ref([])

onMounted(async () => {
  categories.value = await fetchCategories()
})
</script>

<template>
  <h1>Camper category</h1>
  <ul>
    <li v-for="category in categories" :key="category._id">
      <h3>{{ category.name }}</h3>
      <p>{{ category.description }}</p>
    </li>
  </ul>
</template>
