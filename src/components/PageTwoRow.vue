<script setup lang="ts">
import { computed } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

const props = defineProps<{
  index: number
  color: string
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

const attackBackgroundString =
  'linear-gradient(to right,' + '#000' + ',' + props.color + ' 100%'

const releaseBackgroundString =
  'linear-gradient(to right,' + props.color + ',' + '#000' + ' 100%'
</script>

<template>
  <div class="mb-px flex">
    <div
      style="background-color: red; height: 5px"
      :style="{
        width: offsetWidth,
        backgroundColor: '#000',
      }"
    ></div>
    <div
      style="background-color: blue; height: 5px"
      :style="{
        width: attackWidth,
        background: attackBackgroundString,
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      style="background-color: green; height: 5px"
      :style="{
        width: decayWidth,
        backgroundColor: color,
        borderLeft: '1px solid #333',
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      style="background-color: yellow; height: 5px"
      :style="{
        width: holdWidth,
        backgroundColor: color,
        borderLeft: '1px solid #333',
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      style="background-color: purple; height: 5px"
      :style="{
        width: releaseWidth,
        background: releaseBackgroundString,
        borderLeft: '1px solid #333',
      }"
    ></div>
  </div>
</template>
