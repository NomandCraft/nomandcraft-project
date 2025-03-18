<template>
  <nav class="bg-white dark:bg-gray-900 border-b border-gray-200">
    <div class="container mx-auto flex justify-between items-center p-4">
      <NavLogo />
      <NavLinks />
      <UserMenu />
    </div>
  </nav>
</template>

<script setup>
import NavLogo from './NavLogo.vue'
import NavLinks from './NavLinks.vue'
import UserMenu from './UserMenu.vue'
</script>
