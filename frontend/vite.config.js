import { fileURLToPath } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* const __dirname = path.dirname(fileURLToPath(import.meta.url))  */ //
// Создаём `__dirname`

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@store': path.resolve(__dirname, 'src/stores'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    include: ['src/**/*.spec.js', 'src/**/*.test.js'],
    exclude: ['node_modules', 'dist', 'cypress'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})
