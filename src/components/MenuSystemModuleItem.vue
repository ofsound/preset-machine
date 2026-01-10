<script setup lang="ts">
import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

const props = defineProps<{
  id: string
  label: string
}>()

const store = useStore()

const { presetModLayers } = usePreset()

const openModule = () => {
  store.visibleModuleID = props.id
}

const deleteModule = () => {
  for (let index = 0; index < store.modules.length; index++) {
    if (store.modules[index]!.id === props.id) {
      store.modules.splice(index, 1)
    }

    if (presetModLayers[index]!.moduleID === props.id) {
      presetModLayers.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="relative flex gap-1 last:[&>div]:hidden">
    <button
      @click="openModule"
      :class="{ 'bg-teal-400': store.visibleModuleID === id }"
      class="cursor-pointer rounded-sm border bg-slate-100 px-1.5 text-sm font-semibold tracking-wider shadow-md hover:brightness-120"
    >
      {{ label }}
    </button>
    <button
      @click="deleteModule"
      class="absolute -top-2 -left-2 block aspect-square h-4 w-4 cursor-pointer rounded-full border border-black bg-white text-sm font-black"
    >
      <div class="relative -top-[3.5px]">×</div>
    </button>
    <div class="relative top-1 mr-1.5 ml-2.5 text-xl text-slate-600">➡︎</div>
  </div>
</template>
