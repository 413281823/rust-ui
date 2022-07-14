import { App } from 'vue'
import Form from './src/form'
import { installComponent } from '../install'
import type { SniperUIOptions } from '../_utils/global-config'

// 具名导出
export { Form }

// 导出插件
export default {
  install(app: App, options?: SniperUIOptions) {
    installComponent(app, Form, options)
  }
}
