<script setup lang="ts">
import type { ModuleIdentifier } from '@/types/Module.ts'

import MenuSystemModuleItem from '@/components/MenuSystemModuleItem.vue'

import MenuSystemAddModuleButton from '@/components/MenuSystemAddModuleButton.vue'

const modules = defineModel<ModuleIdentifier[]>('modules', { default: [] })

const visibleComponentID = defineModel<string>('visibleComponentID', { default: '' })

const componentTypeArray = ['OffsetModule', 'FreeformModule', 'RandomizeModule']
</script>

<template>
  <div class="border-y-2 bg-slate-300 py-4">
    <div class="mb-3 flex justify-center gap-2">
      <MenuSystemAddModuleButton
        v-for="(item, index) in componentTypeArray"
        :type="item"
        :key="index"
        v-model:modules="modules"
      />
    </div>
    <div
      class="crosshatch-background mx-4 flex min-h-16 justify-center gap-4 rounded-full border border-gray-400 bg-slate-100 pt-4 pb-3"
    >
      <MenuSystemModuleItem
        v-for="item in modules"
        v-model:modules="modules"
        v-model:visibleComponentID="visibleComponentID"
        :key="item.id"
        :id="item.id"
        :type="item.type"
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
