import { App } from 'vue'
import Link from './src/link'
import { installComponent } from '../install'
import type { SniperUIOptions } from '../_utils/global-config'
export { Link }

export default {
  install(app: App, options?: SniperUIOptions) {
    installComponent(app, Link, options)
  }
}
