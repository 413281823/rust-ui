import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import Button from '../build/button/index.es.js'
import '../build/button/style.css'
const app = createApp(App)
app.use(Button)
app.mount('#app')
