<script setup>
import { onMounted, computed } from "vue";
import { useCampersStore } from "@/stores/campers";
import CamperCard from "@/components/CamperCard.vue";

const store = useCampersStore();
const campers = computed(() => store.items);

onMounted(() => {
  if (!store.items.length) store.fetch();
});
</script>

<template>
  <h2 style="margin: 0 0 12px">Available Campers</h2>

  <div v-if="store.loading" class="muted">Loading…</div>
  <div v-else-if="store.error" style="color: #b33">{{ store.error }}</div>
  <div v-else-if="!campers.length" class="muted">No campers found.</div>
  <div v-else class="grid">
    <CamperCard v-for="c in campers" :key="c._id" :camper="c" />
  </div>
</template>
