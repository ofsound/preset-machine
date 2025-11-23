<script setup lang="ts">
import { useStore } from '@/stores/store'

import { toRaw, type Component } from 'vue'
import type { ComponentObject } from '@/types.ts'

import MenuSystemModuleItem from '@/components/MenuSystemModuleItem.vue'

import MenuSystemAddModuleButton from '@/components/MenuSystemAddModuleButton.vue'

const store = useStore()

const props = defineProps<{
  componentObjects: ComponentObject[]
}>()

function getLabel(component: Component): string {
  let returnString = ''

  props.componentObjects.forEach((componentObject) => {
    if (componentObject.component === toRaw(component)) {
      returnString = componentObject.label
    }
  })

  return returnString
}
</script>

<template>
  <div class="border-y-2 bg-linear-to-t from-slate-300 to-stone-200 py-4">
    <div class="mb-3 flex justify-center gap-2">
      <MenuSystemAddModuleButton
        v-for="(item, index) in componentObjects"
        :componentObject="item"
        :key="index"
      />
    </div>
    <div
      class="crosshatch-background mx-4 flex min-h-16 justify-center gap-4 rounded-full border border-gray-400 bg-slate-100 pt-4 pb-3"
    >
      <MenuSystemModuleItem
        v-for="item in store.modules"
        :key="item.id"
        :id="item.id"
        :label="getLabel(item.component)"
      />
    </div>
  </div>
</template>

<style>
.crosshatch-background {
  /* Two linear gradients with opposite angles */
  background-image:
    linear-gradient(45deg, rgba(0, 0, 0, 0.5) 5%, transparent 5%),
    linear-gradient(-45deg, rgba(0, 0, 0, 0.5) 5%, transparent 8%);
  /* Controls the size of each square */
  background-size: 8px 8px;
}
</style>
