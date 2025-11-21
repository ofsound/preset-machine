<script setup lang="ts">
import type { ModuleIdentifier } from '@/types/Module.ts'

import { v4 as uuidv4 } from 'uuid'

import MenuSystemModuleItem from '@/components/MenuSystemModuleItem.vue'

const modules = defineModel<ModuleIdentifier[]>('modules', { default: [] })

const visibleComponentID = defineModel<string>('visibleComponentID', { default: '' })

const addOffset = () => {
  modules.value.push({ type: 'OffsetModule', id: uuidv4() })
}

const addFreeform = () => {
  modules.value.push({ type: 'FreeformModule', id: uuidv4() })
}

const addRandomize = () => {
  modules.value.push({ type: 'RandomizeModule', id: uuidv4() })
}
</script>

<template>
  <div class="border-y-2 bg-slate-300 py-2">
    <div class="mb-5 flex justify-center gap-2">
      <button @click="addOffset" class="border px-2 py-1">Offset ꜜ</button>
      <button @click="addFreeform" class="border px-2 py-1">Freeform ꜜ</button>
      <button @click="addRandomize" class="border px-2 py-1">Randomize ꜜ</button>
    </div>
    <div class="flex justify-center gap-2">
      <MenuSystemModuleItem
        v-for="item in modules"
        v-model:visibleComponentID="visibleComponentID"
        v-model:modules="modules"
        :key="item.id"
        :id="item.id"
        :type="item.type"
      />
    </div>
  </div>
</template>
