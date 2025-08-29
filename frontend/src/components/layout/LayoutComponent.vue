<script setup>
import Header from "./HeaderComponent.vue";
import Footer from "./FooterComponent.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Header />
  <main
    class="container"
    style="min-height: calc(100vh - 64px - 80px); padding: 24px 0"
  >
    <RouterView />
  </main>
  <Footer />
</template>
