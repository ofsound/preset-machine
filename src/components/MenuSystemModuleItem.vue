<script setup lang="ts">
import type { ModuleIdentifier } from '@/types/Module.ts'

const props = defineProps<{
  type: string
  id: string
}>()

const modules = defineModel<ModuleIdentifier[]>('modules', { default: [] })
const visibleComponentID = defineModel<string>('visibleComponentID', { default: '' })

const openModule = () => {
  visibleComponentID.value = props.id
}

const deleteModule = () => {
  for (let index = 0; index < modules.value.length; index++) {
    if (modules.value[index]!.id === props.id) {
      modules.value.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="flex gap-1">
    <button
      @click="openModule"
      :class="{ 'bg-teal-400': visibleComponentID === id }"
      class="rounded-sm border bg-slate-100 px-2 py-1 font-semibold tracking-wider"
    >
      {{ type }}
    </button>
    <button @click="deleteModule" class="ml-1 h-max border bg-slate-100 px-1">×</button>
    <div class="ml-2">➡︎</div>
  </div>
</template>
