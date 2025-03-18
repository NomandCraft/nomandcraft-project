<template>
  <ul class="hidden md:flex space-x-6 font-medium">
    <router-link class="nav-link" to="/">HOME</router-link>
    <router-link class="nav-link" to="/campers">CAMPERVANS</router-link>
    <router-link class="nav-link" to="/about">ABOUT OUR VANS</router-link>
    <router-link class="nav-link" to="/categories">CATEGORIES</router-link>
    <!-- <router-link class="nav-link" to="/pricing">Pricing</router-link> -->
    <router-link class="nav-link" to="/gallery">GALLERY</router-link>
    <router-link class="nav-link" to="/blogs">BLOGS</router-link>
    <router-link class="nav-link" to="/contact">CONTACT</router-link>
  </ul>
</template>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400;
}
</style>
