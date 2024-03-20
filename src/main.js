import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router'
import store from './GlobalState/store'

createApp(App)
.use(router)
.use(store)
.mount('#app')
