<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Condition for a burger-menu
const isMenuOpen = ref(false)
</script>

<template>
  <div class="layout">
    <!-- HEADER -->
    <header class="header">
      <div class="container">
        <!-- Логотип -->
        <RouterLink to="/">
          <img alt="Nomadcraft - Home" class="logo" src="@/assets/logo.svg" />
        </RouterLink>

        <!-- Burger-manager -->
        <button class="burger" @click="isMenuOpen = !isMenuOpen">☰</button>

        <!-- Navigation-->
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

    <!--Basic content -->
    <main class="content">
      <div class="container">
        <RouterView />
        <!-- Home.vue will be loaded here -->
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Nomadcraft. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Added styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 15px 0;
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
.nav-list a.active-link {
  color: #42b983;
  font-weight: bold;
}

.burger {
  display: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  background: none;
  border: none;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }

  .nav-list {
    flex-direction: column;
    gap: 10px;
    display: none;
  }

  .burger {
    display: block;
  }

  .nav-open .nav-list {
    display: flex;
  }
}
</style>
