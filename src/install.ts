import { setGlobalConfig, getComponentPrefix } from './_utils/global-config'
import type { SniperUIOptions } from './_utils/global-config'
import type { App } from 'vue'

type ComponentType = any

export function installComponent(
  app: App,
  component: ComponentType,
  options?: SniperUIOptions
) {
  const componentPrefix = getComponentPrefix(options)
  const registered = app.component(componentPrefix + component.name)

  if (!registered) {
    setGlobalConfig(app, options)
    app.component(componentPrefix + component.name, component)
  }
}
