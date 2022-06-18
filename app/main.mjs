import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import router from './router'
import App from './App.vue'

import '@/assets/global.css'

const app = createApp(App)
const pinia = createPinia()

// attach pinia
app.use(pinia)

// attach router to app
app.use(router)

// attach element plus to app
app.use(ElementPlus)

// mount app to <div id="app"></div>
app.mount('#app')
