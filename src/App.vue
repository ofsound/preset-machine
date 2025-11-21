<script setup lang="ts">
import { ref } from 'vue'

import JsonSave from '@/components/JsonSave.vue'

import { useStore } from '@/stores/store'

import PageTwo from '@/components/PageTwo.vue'
import MenuSystem from '@/components/MenuSystem.vue'
import OffsetModule from '@/components/OffsetModule.vue'
import FreeformModule from '@/components/FreeformModule.vue'
import RandomizeModule from '@/components/RandomizeModule.vue'

import { type Component } from 'vue'

interface ModuleIdentifier {
  id: string
  type: string
}

const visibleComponentID = ref<string>('')

const store = useStore()
const modules = ref<ModuleIdentifier[]>([])

const componentMap: { [key: string]: Component } = {
  OffsetModule,
  FreeformModule,
  RandomizeModule,
}
</script>

<template>
  <div>
    <div class="mb-4 flex items-end justify-between">
      <h1 class="py-4 text-center text-3xl font-bold">
        {{ store.preset.name }} : {{ store.preset.author }}
      </h1>
      <JsonSave />
    </div>

    <PageTwo />

    <MenuSystem v-model:modules="modules" v-model:visibleComponentID="visibleComponentID" />

    <div>
      <component
        v-show="visibleComponentID === item.id"
        v-for="item in modules"
        :key="item.id"
        :is="componentMap[item.type]"
      ></component>
    </div>

    <footer class="mt-auto flex justify-between pt-3 pb-3 text-right text-xs">
      <div class="hidden italic">click (and drag) on row to choose an offset and hold length</div>
      <div>preset machine v0.0.3</div>
    </footer>
  </div>
</template>
