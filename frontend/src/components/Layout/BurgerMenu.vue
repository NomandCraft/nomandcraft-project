<template>
  <div class="relative">
    <!-- Анимированная кнопка бургер-меню -->
    <button
      @click="menuOpen = !menuOpen"
      class="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
    >
      <span
        class="block w-8 h-1 bg-gray-700 dark:bg-white rounded transition-all duration-300"
        :class="{ 'rotate-45 translate-y-2': menuOpen }"
      ></span>
      <span
        class="block w-8 h-1 bg-gray-700 dark:bg-white rounded transition-all duration-300 my-1"
        :class="{ 'opacity-0': menuOpen }"
      ></span>
      <span
        class="block w-8 h-1 bg-gray-700 dark:bg-white rounded transition-all duration-300"
        :class="{ '-rotate-45 -translate-y-2': menuOpen }"
      ></span>
    </button>

    <!-- Выпадающее меню -->
    <div
      v-if="menuOpen"
      class="absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-lg rounded w-48 p-4 transition-all duration-300 transform origin-top"
    >
      <ul class="space-y-4 font-medium">
        <router-link class="nav-link block" to="/" @click="menuOpen = false">HOME</router-link>
        <router-link class="nav-link block" to="/campers" @click="menuOpen = false"
          >CAMPERVANS</router-link
        >
        <router-link class="nav-link block" to="/about" @click="menuOpen = false"
          >ABOUT OUR VANS</router-link
        >
        <router-link class="nav-link block" to="/categories" @click="menuOpen = false"
          >CATEGORIES</router-link
        >
        <router-link class="nav-link block" to="/gallery" @click="menuOpen = false"
          >GALLERY</router-link
        >
        <router-link class="nav-link block" to="/blogs" @click="menuOpen = false"
          >BLOGS</router-link
        >
        <router-link class="nav-link block" to="/contact" @click="menuOpen = false"
          >CONTACT</router-link
        >
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400;
}
</style>
