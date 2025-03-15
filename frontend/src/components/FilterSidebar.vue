<script setup>
import { ref } from 'vue'

const filters = ref({
  price: '',
  location: '',
})
</script>

<template>
  <div class="sidebar">
    <h2>Campers filter</h2>
    <label>
      Price:
      <input v-model="filters.price" type="text" placeholder="Введите цену" />
    </label>
    <label>
      Location:
      <input v-model="filters.location" type="text" placeholder="Введите место" />
    </label>
  </div>
</template>

<style scoped>
.sidebar {
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
}
</style>
