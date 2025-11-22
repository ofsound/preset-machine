<script setup lang="ts">
import { useStore } from '@/stores/store'

import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  type: string
}>()

const store = useStore()

const addComponentToModules = () => {
  store.modules.push({ type: props.type, id: uuidv4() })
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
