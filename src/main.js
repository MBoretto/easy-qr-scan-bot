import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.TWA = window.Telegram.WebApp
app.mount('#app')
