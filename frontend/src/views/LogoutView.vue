<template>
  <div class="container">
    <h1 class="text-2xl font-bold">Logging out...</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Очистка токена или сессии пользователя
  localStorage.removeItem('token')
  sessionStorage.clear()

  // Перенаправление на главную страницу после выхода
  setTimeout(() => {
    router.push('/')
  }, 1000)
})
</script>
