import './assets/main.css'
import './index.css'

import { createApp } from 'vue'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
