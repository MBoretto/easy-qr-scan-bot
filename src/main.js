import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.config.globalProperties.TWA = window.Telegram.WebApp
app.use(vuetify)
app.mount('#app')
