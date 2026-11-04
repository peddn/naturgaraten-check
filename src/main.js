import { createPinia } from 'pinia'
import { createApp } from 'vue'
import '@fontsource/alegreya/500.css'
import '@fontsource/alegreya/700.css'
import '@fontsource/alegreya-sans/400.css'
import '@fontsource/alegreya-sans/500.css'
import '@fontsource/alegreya-sans/700.css'
import './style.css'
import App from './App.vue'
import { router } from './router/index.js'

createApp(App).use(createPinia()).use(router).mount('#app')
