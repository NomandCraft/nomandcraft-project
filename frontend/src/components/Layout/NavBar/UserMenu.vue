<template>
  <div class="relative">
    <button @click="open = !open" class="bg-gray-800 rounded-full p-1 focus:outline-none">
      <img src="@/assets/images/user-avatar.jpg" alt="User Photo" class="h-8 w-8 rounded-full" />
    </button>

    <div v-if="open" class="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded shadow-lg">
      <div class="px-4 py-3">
        <p class="text-gray-800 dark:text-white font-medium">John Doe</p>
        <p class="text-gray-500 dark:text-gray-300 text-sm">john@example.com</p>
      </div>
      <router-link class="dropdown-link" to="/dashboard">Dashboard</router-link>
      <router-link class="dropdown-link" to="/settings">Settings</router-link>
      <router-link class="dropdown-link" to="/logout">Sign out</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
.dropdown-link {
  @apply block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600;
}
</style>
