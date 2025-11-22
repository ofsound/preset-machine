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
    <div class="flex justify-center gap-4 bg-white py-3">
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
