<template>
  <div class="shadow rounded-lg overflow-hidden">
    <img :src="camper.images[0]" class="w-full h-60 object-cover" />
    <div class="p-4">
      <h3 class="font-bold text-lg">{{ camper.name }}</h3>
      <p class="text-gray-600">{{ camper.formattedPrice }}</p>
      <RouterLink :to="`/campers/${camper._id}`" class="btn-primary"> Read more</RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  camper: Object,
})
</script>
