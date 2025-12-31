<script setup lang="ts">
import { ref, toRaw } from 'vue'

import type { ComponentObject } from '@/types.ts'

import { useStore } from '@/stores/store'
const store = useStore()

import WelcomeScreen from '@/components/WelcomeScreen.vue'

import AppHeader from '@/components/AppHeader.vue'

import PageTwo from '@/components/PageTwo.vue'
import MenuSystem from '@/components/MenuSystem.vue'

// import InitModule from '@/components/InitModule.vue'
import GainsModule from '@/components/GainsModule.vue'
// import OffsetModule from '@/components/OffsetModule.vue'
import EnvelopesModule from '@/components/EnvelopesModule.vue'
// import BipolarModule from '@/components/BipolarModule.vue'
// import RandomizeModule from '@/components/RandomizeModule.vue'
import PresetInspector from '@/components/PresetInspector.vue'

const componentObjects: ComponentObject[] = [
  // { component: InitModule, label: 'Init' },
  { component: GainsModule, label: 'Gains' },
  // { component: OffsetModule, label: 'Offset' },
  { component: EnvelopesModule, label: 'Envelopes' },
  // { component: BipolarModule, label: 'Bipolar' },
  // { component: RandomizeModule, label: 'Randomize' },
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

      <div v-show="!isInspector">
        <PageTwo />
        <MenuSystem :componentObjects="componentObjects" />

        <div class="flex-1 bg-slate-800 p-5">
          <div class="h-full rounded-lg bg-neutral-50 px-8 py-5">
            <component
              v-show="store.visibleModuleID === item.id"
              v-for="item in store.modules"
              :key="item.id"
              :is="toRaw(item.component)"
            ></component>
          </div>
        </div>
      </div>
    </template>

    <footer
      class="mt-auto flex justify-between bg-neutral-100 p-3 text-right text-xs"
    >
      <div class="ml-auto font-semibold tracking-wide">
        preset machine v0.0.5
      </div>
    </footer>
  </div>
</template>
