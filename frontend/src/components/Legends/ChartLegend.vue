<template>
  <div class="flex flex-wrap gap-2 mt-4">
    <div
      v-for="(item, index) in legend"
      :key="index"
      class="flex items-center space-x-2 text-sm"
    >
      <span
        class="w-3 h-3 inline-block rounded"
        :style="{ backgroundColor: item.color }"
      ></span>
      <span class="text-gray-600">{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    legend: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
