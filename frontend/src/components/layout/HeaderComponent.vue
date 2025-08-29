<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const open = ref(false);
</script>

<template>
  <header class="bg-[#2c3e50] text-white sticky top-0 z-10">
    <div
      class="container"
      style="
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <RouterLink to="/" class="flex items-center gap-2">
        <span style="font-weight: 700">Nomadcraft</span>
      </RouterLink>

      <button
        class="burger"
        @click="open = !open"
        style="
          display: none;
          background: none;
          border: 0;
          color: #fff;
          font-size: 24px;
        "
      >
        ☰
      </button>

      <nav :class="{ open }" class="nav">
        <RouterLink to="/" active-class="active">Home</RouterLink>
        <RouterLink to="/campers" active-class="active">Campers</RouterLink>
        <RouterLink to="/categories" active-class="active"
          >Categories</RouterLink
        >
        <RouterLink to="/users" active-class="active">Users</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 16px;
}
.nav a {
  color: #fff;
  padding: 8px 10px;
  border-radius: 6px;
}
.nav a.active,
.nav a:hover {
  background: rgba(255, 255, 255, 0.14);
}
@media (max-width: 768px) {
  .burger {
    display: block !important;
  }
  .nav {
    display: none;
    position: absolute;
    top: 64px;
    right: 16px;
    background: #2c3e50;
    padding: 12px;
    border-radius: 12px;
    flex-direction: column;
  }
  .nav.open {
    display: flex;
  }
}
</style>
