import { App } from 'vue'
import Input from './src/input'
import { installComponent } from '../install'
import type { SniperUIOptions } from '../_utils/global-config'

// 具名导出
export { Input }

// 导出插件
export default {
  install(app: App, options?: SniperUIOptions) {
    installComponent(app, Input, options)
  }
}
