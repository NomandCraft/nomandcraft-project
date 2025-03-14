<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="80" />
    <nav>
      <RouterLink to="/">🏠 Home</RouterLink>
      <RouterLink to="/campers">🏕️ Campers</RouterLink>
      <RouterLink to="/categories">📂 Categories</RouterLink>
      <RouterLink to="/users">👥 Users</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background: #2c3e50;
  color: white;
}

.logo {
  width: 50px;
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 8px 12px;
  transition: background 0.3s;
}

nav a:hover {
  background: #1e2a38;
  border-radius: 5px;
}
</style>
