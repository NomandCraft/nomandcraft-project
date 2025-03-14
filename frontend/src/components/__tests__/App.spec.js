import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/views/App.vue' // ✅ Correct imports

// Создаём тестовый router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
})

describe('App.vue', () => {
  it('renders the application', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router], // <-- Connect Router
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
