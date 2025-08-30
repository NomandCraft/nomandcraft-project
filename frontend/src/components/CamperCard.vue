<script setup>
defineProps({
  camper: { type: Object, required: true },
});
</script>

<template>
  <article class="card">
    <div
      style="
        height: 180px;
        background: #eef1f4;
        display: grid;
        place-items: center;
      "
    >
      <img
        v-if="camper?.images?.length"
        :src="camper.images[0]"
        :alt="camper.name"
        style="width: 100%; height: 100%; object-fit: cover"
      />
      <div v-else class="muted">No image</div>
    </div>
    <div style="padding: 12px; display: grid; gap: 8px">
      <h3 style="margin: 0">{{ camper.name }}</h3>
      <p class="muted" style="margin: 0">{{ camper.formattedPrice ?? "—" }}</p>
      <RouterLink
        :to="`/campers/${camper._id}`"
        class="btn"
        style="justify-self: start"
        >Read more</RouterLink
      >
    </div>
  </article>
</template>
