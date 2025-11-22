<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()

const props = defineProps<{
  type: string
  id: string
}>()

const openModule = () => {
  store.visibleComponentID = props.id
}

const deleteModule = () => {
  for (let index = 0; index < store.modules.length; index++) {
    if (store.modules[index]!.id === props.id) {
      store.modules.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="relative flex gap-1 last:[&>div]:hidden">
    <button
      @click="openModule"
      :class="{ 'bg-teal-400': store.visibleComponentID === id }"
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
