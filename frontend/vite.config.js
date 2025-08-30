import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const backend = process.env.VITE_API_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: {
    port: 5173,
    strictPort: false,
    // proxy so that there is no CORS: /API -> Backend
    proxy: {
      "/api": {
        target: backend,
        changeOrigin: true,
      },
    },
  },
});
