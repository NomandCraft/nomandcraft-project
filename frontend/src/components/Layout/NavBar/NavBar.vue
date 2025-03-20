<template>
  <nav class="bg-white dark:bg-gray-900 border-b border-gray-200">
    <div class="container mx-auto flex justify-between items-center p-4">
      <NavLogo />
      <!--  <!-Burger-Men (appears at the width <1280px)-> -->
      <BurgerMenu v-if="!isDesktop" />
      <NavLinks v-if="isDesktop" />
      <UserMenu />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavLogo from './NavLogo.vue'
import NavLinks from './NavLinks.vue'
import UserMenu from './UserMenu.vue'
import BurgerMenu from '../BurgerMenu.vue'

const isDesktop = ref(window.innerWidth >= 1280)

// Follow the change in the width of the screen
const updateScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1280
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
})
</script>
