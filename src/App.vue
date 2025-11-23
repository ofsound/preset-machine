<script setup lang="ts">
import { toRaw } from 'vue'

import type { ComponentObject } from '@/types.ts'

import { useStore } from '@/stores/store'
const store = useStore()

import AppHeader from '@/components/AppHeader.vue'

import PageTwo from '@/components/PageTwo.vue'
import MenuSystem from '@/components/MenuSystem.vue'

import OffsetModule from '@/components/OffsetModule.vue'
import FreeformModule from '@/components/FreeformModule.vue'
import RandomizeModule from '@/components/RandomizeModule.vue'

const componentObjects: ComponentObject[] = [
  { component: OffsetModule, label: 'Offset' },
  { component: FreeformModule, label: 'Freeform' },
  { component: RandomizeModule, label: 'Randomize' },
]
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <AppHeader />
    <PageTwo />
    <MenuSystem :componentObjects="componentObjects" />

    <div class="flex-1 bg-slate-800 p-5">
      <div class="h-full rounded-lg bg-neutral-50 p-8">
        <component
          v-show="store.visibleComponentID === item.id"
          v-for="item in store.modules"
          :key="item.id"
          :is="toRaw(item.component)"
        ></component>
      </div>
    </div>

    <footer
      class="mt-auto flex justify-between bg-neutral-100 p-3 text-right text-xs"
    >
      <div class="hidden italic">
        click (and drag) on row to choose an offset and hold length
      </div>
      <div class="ml-auto font-semibold tracking-wide">
        preset machine v0.0.3
      </div>
    </footer>
  </div>
</template>
