<template>
  <div class="shadow rounded-lg overflow-hidden">
    <img
      v-if="camper?.images?.length"
      :src="camper.images[0]"
      class="w-full h-60 object-cover"
      alt="Camper Image"
    />
    <div v-else class="w-full h-60 flex items-center justify-center bg-gray-300">
      No Image Available
    </div>

    <div class="p-4">
      <h3 class="font-bold text-lg">{{ camper.name }}</h3>
      <p class="text-gray-600">{{ camper.formattedPrice || 'Price unavailable' }}</p>
      <RouterLink v-if="camper._id" :to="`/campers/${camper._id}`" class="btn-primary">
        Read more
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  camper: {
    type: Object,
    required: false,
    default: () => ({
      name: 'Unknown camper',
      description: 'No information',
      images: [],
      formattedPrice: 'N/A',
    }),
  },
})
</script>
