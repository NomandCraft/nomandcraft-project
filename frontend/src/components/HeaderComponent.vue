<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/">
        <img alt="Nomadcraft" class="logo" src="@/assets/logo.svg" />
      </RouterLink>

      <button class="burger" @click="isMenuOpen = !isMenuOpen">☰</button>

      <nav :class="{ 'nav-open': isMenuOpen }">
        <ul class="nav-list">
          <li><RouterLink to="/" active-class="active-link">Home</RouterLink></li>
          <li><RouterLink to="/campers" active-class="active-link">Campers</RouterLink></li>
          <li><RouterLink to="/categories" active-class="active-link">Categories</RouterLink></li>
          <li><RouterLink to="/users" active-class="active-link">Users</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  background: #2c3e50;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  width: 80px;
}

.nav-list {
  display: flex;
  gap: 20px;
  list-style: none;
}

.nav-list a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px;
  transition: color 0.3s;
}

.nav-list a:hover,
.active-link {
  color: #42b983;
  font-weight: bold;
}

.burger {
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  color: white;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    gap: 10px;
  }

  .burger {
    display: block;
  }

  .nav-open .nav-list {
    display: flex;
  }
}
</style>
