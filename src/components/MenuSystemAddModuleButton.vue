<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

const { presetModLayers } = usePreset()

import type { ComponentObject, PresetModLayer } from '@/types.ts'

const props = defineProps<{
  componentObject: ComponentObject
}>()

const store = useStore()

const addComponentToModules = () => {
  const idForNewComponent = uuidv4()

  store.modules.push({
    component: props.componentObject.component,
    id: idForNewComponent,
  })
  store.visibleModuleID = idForNewComponent

  const presetModLayer: PresetModLayer = {
    moduleID: idForNewComponent,
    offsets: Array(511).fill(0),
    attacks: Array(511).fill(0),
    decays: Array(511).fill(0),
    holds: Array(511).fill(0),
    releases: Array(511).fill(0),
  }

  presetModLayers.push(presetModLayer)
}
</script>

<template>
  <button
    @click="addComponentToModules"
    class="cursor-pointer rounded-sm border bg-slate-200 px-2 py-1 text-xs font-semibold tracking-wider shadow-sm hover:bg-neutral-100"
  >
    {{ componentObject.label }} <span class="relative text-[10px]">⬇︎</span>
  </button>
</template>
