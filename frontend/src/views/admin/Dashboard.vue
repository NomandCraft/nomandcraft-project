<template>
  <div class="p-4 space-y-10">
    <!-- Выбор типа данных -->
    <div class="flex items-center space-x-3">
      <label class="text-sm font-semibold">🗂 Dataset:</label>
      <select
        v-model="selected"
        @change="fetchAllCharts"
        class="border px-3 py-1 rounded"
      >
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
    </div>

    <!-- 🔹 График продаж -->
    <div>
      <ChartCard
        v-if="charts.sales.labels.length"
        type="line"
        :data="charts.sales"
        :options="chartOptions"
        :loading="loading"
        title="Sales"
        :subtitle="`Year: ${selected}`"
        :allow-type-switch="true"
        @point-click="onPointClick"
      />
      <ChartLegend :legend="getLegend(charts.sales)" />
    </div>

    <!-- 🔹 График выручки -->
    <div>
      <ChartCard
        v-if="charts.revenue.labels.length"
        type="bar"
        :data="charts.revenue"
        :options="chartOptions"
        :loading="loading"
        title="Revenue"
        :subtitle="`Year: ${selected}`"
        :allow-type-switch="true"
      />
      <ChartLegend :legend="getLegend(charts.revenue)" />
    </div>

    <!-- 🔹 Пользователи -->
    <div>
      <ChartCard
        v-if="charts.users.labels.length"
        type="doughnut"
        :data="charts.users"
        :options="lightOptions"
        :loading="loading"
        title="Users by Platform"
        subtitle="Mobile vs Desktop"
      />
      <ChartLegend :legend="getLegend(charts.users)" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ChartCard from "@/components/Cards/ChartCard.vue";
import ChartLegend from "@/components/Legends/ChartLegend.vue";

export default {
  components: { ChartCard, ChartLegend },
  data() {
    return {
      loading: false,
      selected: "2025",
      charts: {
        sales: { labels: [], datasets: [] },
        revenue: { labels: [], datasets: [] },
        users: { labels: [], datasets: [] },
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#444" },
          },
        },
        scales: {
          x: {
            ticks: { color: "#888" },
            grid: { color: "rgba(0,0,0,0.1)" },
          },
          y: {
            ticks: { color: "#888" },
            grid: { color: "rgba(0,0,0,0.1)" },
          },
        },
      },
      lightOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#333" },
          },
        },
      },
    };
  },

  mounted() {
    this.fetchAllCharts();
  },

  methods: {
    async fetchAllCharts() {
      this.loading = true;
      try {
        const [sales, revenue, users] = await Promise.all([
          this.fetchChart("sales"),
          this.fetchChart("revenue"),
          this.fetchChart("users"),
        ]);
        this.charts.sales = sales;
        this.charts.revenue = revenue;
        this.charts.users = users;
      } catch (e) {
        console.error("API error:", e);
      } finally {
        this.loading = false;
      }
    },

    async fetchChart(type) {
      // Замените URL на ваш реальный API
      // return axios.get(`/api/charts/${type}?year=${this.selected}`);
      return this.mockApi(type, this.selected);
    },

    getLegend(chartData) {
      if (!chartData.datasets.length) return [];
      return chartData.datasets.map((ds) => ({
        label: ds.label,
        color: ds.borderColor || ds.backgroundColor,
      }));
    },

    onPointClick({ label, value }) {
      alert(`📌 ${label}: ${value}`);
    },

    mockApi(type, year) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
          const datasets = {
            sales: [
              {
                label: `Sales ${year}`,
                data: [35, 60, 50, 70, 90, 100, 110],
                borderColor: "#3b82f6",
                backgroundColor: "#3b82f6",
                fill: false,
              },
            ],
            revenue: [
              {
                label: `Revenue ${year}`,
                data: [10000, 12000, 14000, 15000, 13000, 17000, 20000],
                borderColor: "#10b981",
                backgroundColor: "#10b981",
                fill: false,
              },
            ],
            users: [
              {
                label: "Mobile",
                data: [60],
                backgroundColor: "#ec4899",
              },
              {
                label: "Desktop",
                data: [40],
                backgroundColor: "#6366f1",
              },
            ],
          };
          resolve({
            labels: type === "users" ? [""] : labels,
            datasets: datasets[type],
          });
        }, 1000);
      });
    },
  },
};
</script>
