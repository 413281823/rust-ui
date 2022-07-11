import { App } from 'vue'
import LinkComponent from './src/linkComponent'
import { installComponent } from '../install'
import type { SniperUIOptions } from '../_utils/global-config'

// 具名导出
export { LinkComponent }

// 导出插件
export default {
  install(app: App, options?: SniperUIOptions) {
    installComponent(app, LinkComponent, options)
  }
}
