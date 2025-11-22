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
  <div class="relative flex gap-1 last:[&>div]:hidden">
    <button
      @click="openModule"
      :class="{ 'bg-teal-400': visibleComponentID === id }"
      class="rounded-sm border bg-slate-100 px-2 py-1 font-semibold tracking-wider shadow-md"
    >
      {{ type }}
    </button>
    <button
      @click="deleteModule"
      class="absolute -top-2.5 -left-2.5 block aspect-square h-5 w-5 rounded-full border border-black bg-white text-sm font-black"
    >
      <div class="relative -top-px">×</div>
    </button>
    <div class="relative top-1 mr-2 ml-3 text-xl text-slate-600">➡︎</div>
  </div>
</template>
