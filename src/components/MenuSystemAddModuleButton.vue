<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

import { useStore } from '@/stores/store'

import type { ComponentObject } from '@/types.ts'

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
}
</script>

<template>
  <button
    @click="addComponentToModules"
    class="cursor-pointer rounded-sm border bg-slate-200 px-2 py-1 text-sm font-semibold tracking-wider shadow-sm hover:bg-neutral-100"
  >
    {{ componentObject.label }} <span class="relative text-xs">⬇︎</span>
  </button>
</template>
