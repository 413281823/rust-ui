//入口文件
// 引入实现的组件批量导出去
import type { App } from 'vue'
import ButtonPlugin, { Button } from '../src/button'

// 导出这些组件
export { Button }
const install = [ButtonPlugin]
//导出vue插件
export default {
  install(app: App) {
    install.forEach(p => {
      app.use(p)
    })
  }
}
