import { type Component } from 'vue'

export interface ModuleObject {
  component: Component
  id: string
}

export interface ComponentObject {
  component: Component
  label: string
}

export interface EnvelopeLabelAndSegment {
  envelopeSegment: number[]
  label: string
}
