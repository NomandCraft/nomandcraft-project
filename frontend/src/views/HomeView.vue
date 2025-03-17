<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="home">
    <div class="intro">
      <h1>🚐 Welcome to Nomadcraft!</h1>
      <p>Find the perfect camper for your next adventure.</p>
      <div class="buttons">
        <RouterLink to="/campers" class="btn">🏕️ View Campers</RouterLink>
        <RouterLink to="/categories" class="btn">📂 Categories</RouterLink>
        <RouterLink to="/users" class="btn">👥 Users</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 60px 20px;
  background-color: #f8f9fa;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro {
  max-width: 600px;
}

.intro h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.intro p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s;
}

.btn:hover {
  background: #369870;
}
</style>
