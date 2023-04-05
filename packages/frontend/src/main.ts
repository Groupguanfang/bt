import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import './assets/main.less'

const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)

app.mount('#app')
