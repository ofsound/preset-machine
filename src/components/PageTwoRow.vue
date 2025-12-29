<script setup lang="ts">
import { computed } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'

const props = defineProps<{
  index: number
  color: string
}>()

const { corePreset } = usePreset()

const offsetWidth = computed(() => {
  return corePreset.offsets[props.index]! * 100 + 'px'
})

const attackWidth = computed(() => {
  return corePreset.attacks[props.index]! * 100 + 'px'
})

const decayWidth = computed(() => {
  return corePreset.decays[props.index]! * 100 + 'px'
})

const holdWidth = computed(() => {
  return corePreset.holds[props.index]! * 100 + 'px'
})

const releaseWidth = computed(() => {
  return corePreset.releases[props.index]! * 100 + 'px'
})

const attackBackgroundString =
  'linear-gradient(to right,' + '#000' + ',' + props.color + ' 100%'

const releaseBackgroundString =
  'linear-gradient(to right,' + props.color + ',' + '#000' + ' 100%'
</script>

<template>
  <div class="mb-px flex">
    <div
      :style="{
        height: '5px',
        width: offsetWidth,
        backgroundColor: '#000',
      }"
    ></div>
    <div
      :style="{
        height: '5px',
        width: attackWidth,
        background: attackBackgroundString,
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      :style="{
        height: '5px',
        width: decayWidth,
        backgroundColor: color,
        borderLeft: '1px solid #333',
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      :style="{
        height: '5px',
        width: holdWidth,
        backgroundColor: color,
        borderLeft: '1px solid #333',
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      :style="{
        height: '5px',
        width: releaseWidth,
        background: releaseBackgroundString,
        borderLeft: '1px solid #333',
      }"
    ></div>
  </div>
</template>
