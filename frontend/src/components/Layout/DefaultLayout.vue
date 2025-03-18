<template>
  <div class="layout flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-1 container mx-auto p-4">
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
/* import NavBar from './navbar/NavBar.vue' */
import NavBar from './NavBar/NavBar.vue'
import FooterComponent from './FooterComponent.vue'
</script>
