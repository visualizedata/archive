import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import router from './router'

import '@/assets/global.css'

const RootApp = defineAsyncComponent(() => import('./App.vue'))
const app = createApp(RootApp)
const pinia = createPinia()

// attach pinia
app.use(pinia)

// attach router to app
app.use(router)

// attach element plus to app
app.use(ElementPlus)

// mount app to <div id="app"></div>
app.mount('#app')
