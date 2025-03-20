<template>
  <div class="layout flex flex-col custom-bg w-full h-screen">
    <NavBar />
    <main class="flex-1 flex flex-col justify-between container mx-auto p-4">
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.custom-bg {
  background-image: url('/src/assets/images/bg_image_VW2.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media (min-width: 768px) {
  .custom-bg {
    background-size: cover !important;
  }
}
@media (max-width: 768px) {
  .custom-bg {
    background-position: top;
  }
}
</style>

<script setup>
/* import NavBar from './navbar/NavBar.vue' */
import NavBar from './NavBar/NavBar.vue'
import FooterComponent from './FooterComponent.vue'
</script>
