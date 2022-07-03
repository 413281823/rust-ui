import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
// import Button from './button'
// import Space from './space'
// 使用全量导出
import SniperUI from './index'
createApp(App).use(SniperUI).mount('#app')
