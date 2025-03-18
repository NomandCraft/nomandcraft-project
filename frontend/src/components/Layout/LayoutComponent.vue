<script setup>
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
</script>

<template>
  <div class="layout">
    <HeaderComponent />
    <main class="content">
      <div class="container">
        <slot />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
