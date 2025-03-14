import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './views/App.vue'
import router from './router'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
