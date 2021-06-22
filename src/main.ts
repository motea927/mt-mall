import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { store, key } from './store/store'

import '/@/assets/css/tailwind.css'

createApp(App).use(router).use(store, key).mount('#app')
