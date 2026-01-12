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
    gains: Array(511).fill(0),
    sustains: Array(511).fill(0),
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
    class="mr-2 cursor-pointer rounded-sm bg-slate-200/0 px-2 py-1 text-2xl font-black tracking-wider text-shadow-gray-300 text-shadow-sm"
  >
    <!-- {{ componentObject.label }} <span class="relative text-[10px]">⬇︎</span> -->
    &#10133;
  </button>
</template>
