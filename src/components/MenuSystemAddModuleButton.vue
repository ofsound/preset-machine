<script setup lang="ts">
import type { ModuleIdentifier } from '@/types/Module.ts'

import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  type: string
}>()

const modules = defineModel<ModuleIdentifier[]>('modules', { default: [] })

const addComponentToModules = () => {
  modules.value.push({ type: props.type, id: uuidv4() })
}
</script>

<template>
  <button
    @click="addComponentToModules"
    class="cursor-pointer rounded-sm border bg-slate-200 px-2 py-1 text-sm font-semibold tracking-wider shadow-sm hover:bg-neutral-100"
  >
    {{ type }} <span class="relative text-xs">⬇︎</span>
  </button>
</template>
