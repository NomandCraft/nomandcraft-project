<script setup>
import Header from '../HeaderComponent.vue'
import Footer from '../FooterComponent.vue'
</script>

<template>
  <div class="layout">
    <Header />
    <main class="content">
      <div class="container">
        <slot />
        <!-- Page content will be inserted here -->
      </div>
    </main>
    <Footer />
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
