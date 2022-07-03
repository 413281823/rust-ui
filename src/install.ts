import { setGlobalConfig } from './_utils/global-config'
import type { SniperUIOptions } from './_utils/global-config'
import type { App } from 'vue'

type ComponentType = any

export function installComponent(
  app: App,
  component: ComponentType,
  options?: SniperUIOptions
) {
  console.log(component.name)
  const registered = app.component(component.name)

  if (!registered) {
    setGlobalConfig(app, options)
    app.component(component.name, component)
  }
}
