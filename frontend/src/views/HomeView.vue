<script setup>
/* import { RouterLink } from 'vue-router' */
</script>

<template>
  <section class="home">
    <h1>🚐 Welcome to Nomadcraft!</h1>
    <p>Find the perfect camper for your next adventure.</p>
    <!--   <div class="buttons">
      <RouterLink to="/campers" class="btn">🏕️ View Campers</RouterLink>
      <RouterLink to="/categories" class="btn">📂 Categories</RouterLink>
      <RouterLink to="/users" class="btn">👥 Users</RouterLink>
    </div> -->
  </section>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 60px 20px;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}
.btn {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
.btn:hover {
  background: #369870;
}
</style>
