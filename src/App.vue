<script setup lang="ts">
import { ref, toRaw } from 'vue'

import type { ComponentObject } from '@/types.ts'

import { useStore } from '@/stores/store'
const store = useStore()

import WelcomeScreen from '@/components/WelcomeScreen.vue'

import AppHeader from '@/components/AppHeader.vue'

import PresetVisualizer from '@/components/PresetVisualizer.vue'
import MenuSystem from '@/components/MenuSystem.vue'

import EnvelopesModule from '@/components/module/EnvelopesModule.vue'
import PresetInspector from '@/components/PresetInspector.vue'

const componentObjects: ComponentObject[] = [
  { component: EnvelopesModule, label: 'Layer' },
]
const isWelcome = ref(true)
const isInspector = ref(false)

const closeWelcome = () => {
  isWelcome.value = false
}

const toggleInspector = () => {
  isInspector.value = !isInspector.value
}
</script>

<template>
  <div class="flex h-full w-full flex-col">
    <WelcomeScreen v-if="isWelcome" @closeWelcome="closeWelcome" />

    <template v-if="!isWelcome">
      <AppHeader @toggleInspector="toggleInspector" :isInspector />
      <div v-show="isInspector">
        <PresetInspector />
      </div>

      <div v-show="!isInspector" class="flex min-h-0 flex-1 flex-col">
        <PresetVisualizer />

        <MenuSystem :componentObjects="componentObjects" />

        <div class="min-h-0 flex-1 bg-slate-800 p-5">
          <component
            v-show="store.visibleModuleID === item.id"
            v-for="item in store.modules"
            :key="item.id"
            :is="toRaw(item.component)"
          ></component>
        </div>
      </div>
    </template>

    <footer
      class="mt-auto flex justify-between bg-neutral-100 p-2 text-right text-xs"
    >
      <div class="flex gap-2"></div>
      <div class="ml-auto font-semibold tracking-wide">preset machine v0.1</div>
    </footer>
  </div>
</template>
