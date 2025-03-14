<template>
  <div class="container">
    <h1>🚐 Welcome to Nomadcraft!</h1>
    <p>Here you can find the best camps for travelers 🚀</p>

    <div class="buttons">
      <RouterLink to="/campers" class="btn">🏕️ View Campers</RouterLink>
      <RouterLink to="/categories" class="btn">📂 Categories</RouterLink>
      <RouterLink to="/users" class="btn">👥 Users</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 50px;
}

h1 {
  color: #42b983;
}

p {
  font-size: 1.2rem;
  color: #666;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn:hover {
  background: #368f6b;
}
</style>
