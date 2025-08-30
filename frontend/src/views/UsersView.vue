<script setup>
import { ref, onMounted } from "vue";
import { getUsers } from "@/api";

const users = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (e) {
    error.value = e?.message ?? "Failed to load users";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <h2 style="margin: 0 0 12px">Users</h2>
  <div v-if="loading" class="muted">Loading…</div>
  <div v-else-if="error" style="color: #b33">{{ error }}</div>

  <ul v-else style="display: grid; gap: 8px; padding-left: 18px">
    <li v-for="u in users" :key="u._id" class="card" style="padding: 12px">
      <div style="font-weight: 600">{{ u.name }}</div>
      <div class="muted">
        Email: {{ u.email }} <span v-if="u.role">| Role: {{ u.role }}</span>
      </div>
    </li>
  </ul>
</template>
