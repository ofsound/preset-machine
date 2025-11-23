<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

import FreeformEnvelope from '@/components/FreeformEnvelope.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const envSegments = [
  { label: 'Offset', envSegment: preset.offsets },
  { label: 'Attack', envSegment: preset.attacks },
  { label: 'Decay', envSegment: preset.decays },
  { label: 'Hold', envSegment: preset.holds },
  { label: 'Release', envSegment: preset.releases },
]

const updateEnvSegmentArray = (index: number, updatedArray: number[]) => {
  if (envSegments[index]) {
    envSegments[index].envSegment.forEach((element, i) => {
      envSegments[index]!.envSegment[i] = updatedArray[i]
    })
  }
}

const lastKeyPressed = ref('2')
const allowedKeys = ['1', '2', '3', '4', '5']

const handleKeydown = (event: KeyboardEvent) => {
  if (allowedKeys.includes(event.key)) {
    lastKeyPressed.value = event.key
  }
}

// To capture globally across the entire application:
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex" @keydown="handleKeydown">
    <FreeformEnvelope
      v-show="parseInt(lastKeyPressed) === index + 1"
      v-for="(item, index) in envSegments"
      :key="index"
      :index="index"
      :envSegment="item.envSegment"
      :label="item.label"
      @updateEnvSegmentArray="updateEnvSegmentArray(index, $event)"
    />
  </div>
</template>
