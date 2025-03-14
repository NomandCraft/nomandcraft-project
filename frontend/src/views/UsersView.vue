<script setup>
import { ref, onMounted } from 'vue'
import { fetchUsers } from '@/api.js'

const users = ref([])

onMounted(async () => {
  users.value = await fetchUsers()
})
</script>

<template>
  <h1>List of users</h1>
  <ul>
    <li v-for="user in users" :key="user._id">
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
    </li>
  </ul>
</template>
