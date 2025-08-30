<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    style="
      text-align: center;
      padding: 64px 0;
      background: #fbfcfc;
      border-radius: 12px;
    "
  >
    <h1 style="margin: 0 0 12px">Explore the world with Nomadcraft</h1>
    <p class="muted" style="margin: 0 0 24px">
      Find the best camper for your next adventure.
    </p>
    <div style="display: inline-flex; gap: 12px">
      <RouterLink class="btn" to="/campers">View Campers</RouterLink>
      <RouterLink class="btn" to="/categories">Categories</RouterLink>
      <RouterLink class="btn" to="/users">Users</RouterLink>
    </div>
  </section>
</template>
