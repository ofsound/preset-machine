import { type Component } from 'vue'

export interface ModuleIdentifier {
  id: string
  component: Component
}

export interface ComponentObject {
  component: Component
  componentLabel: string
}
