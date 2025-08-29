<script setup>
import { ref, onMounted } from "vue";
import { getCategories } from "@/api";

const categories = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    categories.value = await getCategories();
  } catch (e) {
    error.value = e?.message ?? "Failed to load categories";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <h2 style="margin: 0 0 12px">Categories</h2>
  <div v-if="loading" class="muted">Loading…</div>
  <div v-else-if="error" style="color: #b33">{{ error }}</div>

  <ul v-else style="display: grid; gap: 8px; padding-left: 18px">
    <li
      v-for="cat in categories"
      :key="cat._id"
      class="card"
      style="padding: 12px"
    >
      <div style="font-weight: 600">{{ cat.name }}</div>
      <div class="muted">{{ cat.description }}</div>
    </li>
  </ul>
</template>
