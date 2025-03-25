<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="bgColor"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center justify-between">
        <div class="relative w-auto">
          <h6 :class="titleClass" class="uppercase mb-1 text-xs font-semibold">
            {{ title }}
          </h6>
          <h2 :class="subtitleClass" class="text-xl font-semibold">
            {{ subtitle }}
          </h2>
        </div>
        <!-- 🔁 Тип графика -->
        <select
          v-if="allowTypeSwitch"
          v-model="chartType"
          class="bg-white text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 focus:outline-none"
        >
          <option v-for="t in chartTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </div>

    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <div
          v-if="loading"
          class="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded"
        >
          <svg
            class="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>

        <canvas
          ref="canvas"
          :class="{ 'opacity-50': loading }"
          @click="handleClick"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  BarController,
  PieController,
  DoughnutController,
  RadarController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(
  LineController,
  BarController,
  PieController,
  DoughnutController,
  RadarController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
);

export default {
  props: {
    type: { type: String, required: true },
    data: { type: Object, required: true },
    options: { type: Object, default: () => ({}) },
    title: { type: String, default: "Chart Title" },
    subtitle: { type: String, default: "Subtitle" },
    bgColor: { type: String, default: "bg-white" },
    titleClass: { type: String, default: "text-blueGray-400" },
    subtitleClass: { type: String, default: "text-blueGray-700" },
    loading: { type: Boolean, default: false },
    allowTypeSwitch: { type: Boolean, default: false },
  },

  emits: ["point-click"],

  data() {
    return {
      chart: null,
      chartType: this.type,
      chartTypes: ["line", "bar", "pie", "doughnut", "radar", "polarArea"],
    };
  },

  watch: {
    data: {
      deep: true,
      handler() {
        if (this.chart) {
          this.chart.data = this.data;
          this.chart.update();
        }
      },
    },
    chartType(newType) {
      if (this.chart) {
        this.chart.destroy();
        const ctx = this.$refs.canvas.getContext("2d");
        this.chart = new Chart(ctx, {
          type: newType,
          data: this.data,
          options: this.options,
        });
      }
    },
  },

  mounted() {
    const ctx = this.$refs.canvas.getContext("2d");
    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.data,
      options: this.options,
    });
  },

  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },

  methods: {
    handleClick(evt) {
      if (!this.chart) return;
      const points = this.chart.getElementsAtEventForMode(
        evt,
        "nearest",
        { intersect: true },
        false,
      );
      if (points.length > 0) {
        const datasetIndex = points[0].datasetIndex;
        const index = points[0].index;
        const label = this.chart.data.labels[index];
        const value = this.chart.data.datasets[datasetIndex].data[index];
        this.$emit("point-click", { label, value, datasetIndex, index });
      }
    },
  },
};
</script>
