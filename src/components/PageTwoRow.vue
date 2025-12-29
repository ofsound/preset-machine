<script setup lang="ts">
import { computed } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'

const props = defineProps<{
  index: number
  color: string
}>()

const { finalPreset } = usePreset()

const offsetWidth = computed(() => {
  return finalPreset.value.offsets[props.index]! * 100 + 'px'
})

const attackWidth = computed(() => {
  return finalPreset.value.attacks[props.index]! * 100 + 'px'
})

const decayWidth = computed(() => {
  return finalPreset.value.decays[props.index]! * 100 + 'px'
})

const holdWidth = computed(() => {
  return finalPreset.value.holds[props.index]! * 100 + 'px'
})

const releaseWidth = computed(() => {
  return finalPreset.value.releases[props.index]! * 100 + 'px'
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
