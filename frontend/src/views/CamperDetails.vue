<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCamperById } from "@/api";

const route = useRoute();
const camper = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    camper.value = await getCamperById(route.params.id);
    if (!camper.value) error.value = "Camper not found";
  } catch (e) {
    error.value = e?.message ?? "Failed to load camper";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="muted">Loading…</div>
  <div v-else-if="error" style="color: #b33">{{ error }}</div>

  <div v-else class="grid" style="grid-template-columns: 1fr; gap: 16px">
    <img
      v-if="camper.images?.length"
      :src="camper.images[0]"
      :alt="camper.name"
      style="
        width: 100%;
        max-width: 720px;
        border-radius: 12px;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      "
    />
    <div>
      <h1 style="margin: 0 0 8px">{{ camper.name }}</h1>
      <p class="muted" v-if="camper.formattedPrice">
        Price: {{ camper.formattedPrice }}
      </p>
      <p style="margin-top: 12px">{{ camper.description }}</p>
    </div>
  </div>
</template>
