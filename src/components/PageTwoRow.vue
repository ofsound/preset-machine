<script setup lang="ts">
import { computed } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

const props = defineProps<{
  index: number
}>()

const offsetWidth = computed(() => {
  return preset.offsets[props.index] * 100 + 'px'
})

const attackWidth = computed(() => {
  return preset.attacks[props.index] * 100 + 'px'
})

const decayWidth = computed(() => {
  return preset.decays[props.index] * 100 + 'px'
})

const holdWidth = computed(() => {
  return preset.holds[props.index] * 100 + 'px'
})

const releaseWidth = computed(() => {
  return preset.releases[props.index] * 100 + 'px'
})
</script>

<template>
  <div class="flex">
    <div
      style="background-color: red; height: 5px"
      :style="{ width: offsetWidth }"
    ></div>
    <div
      style="background-color: blue; height: 5px"
      :style="{ width: attackWidth }"
    ></div>
    <div
      style="background-color: green; height: 5px"
      :style="{ width: decayWidth }"
    ></div>
    <div
      style="background-color: yellow; height: 5px"
      :style="{ width: holdWidth }"
    ></div>
    <div
      style="background-color: purple; height: 5px"
      :style="{ width: releaseWidth }"
    ></div>
  </div>
</template>
