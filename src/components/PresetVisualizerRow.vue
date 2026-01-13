<script setup lang="ts">
import { computed, ref } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'

const props = defineProps<{
  index: number
  timeScaleSeconds: number
  color: string
}>()

const harmonicNumber = props.index + 1

const { finalPreset } = usePreset()

const rowElement = ref<HTMLElement | null>(null)

const scaleFactor = computed(() => {
  if (rowElement.value === null) {
    return 20
  } else {
    return rowElement.value!.clientWidth / props.timeScaleSeconds
  }
})

const gainOpacity = computed(() => {
  return finalPreset.value.gains[props.index]! / (1 / harmonicNumber)
})

const offsetWidth = computed(() => {
  return finalPreset.value.offsets[props.index]! * scaleFactor.value + 'px'
})

const attackWidth = computed(() => {
  return finalPreset.value.attacks[props.index]! * scaleFactor.value + 'px'
})

const decayWidth = computed(() => {
  return finalPreset.value.decays[props.index]! * scaleFactor.value + 'px'
})

const holdWidth = computed(() => {
  return finalPreset.value.holds[props.index]! * scaleFactor.value + 'px'
})

const releaseWidth = computed(() => {
  return finalPreset.value.releases[props.index]! * scaleFactor.value + 'px'
})

const attackBackgroundString =
  'linear-gradient(to right,' + '#000' + ',' + props.color + ' 100%'

const releaseBackgroundString =
  'linear-gradient(to right,' + props.color + ',' + '#000' + ' 100%'
</script>

<template>
  <div ref="rowElement" class="flex flex-1" :style="{ opacity: gainOpacity }">
    <div
      :style="{
        width: offsetWidth,
        backgroundColor: '#000',
      }"
    ></div>
    <div
      :style="{
        width: attackWidth,
        background: attackBackgroundString,
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      :style="{
        width: decayWidth,
        backgroundColor: color,
        borderLeft: '1px solid #666',
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      :style="{
        width: holdWidth,
        backgroundColor: color,
        borderLeft: '1px solid #666',
        borderRight: '1px solid #FFF',
      }"
    ></div>
    <div
      :style="{
        width: releaseWidth,
        background: releaseBackgroundString,
        borderLeft: '1px solid #666',
      }"
    ></div>
  </div>
</template>
