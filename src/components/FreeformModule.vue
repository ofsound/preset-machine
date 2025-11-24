<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

import FreeformEnvelope from '@/components/FreeformEnvelope.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const envelopeSegments = [
  { label: 'Offset', envelopeSegment: preset.offsets },
  { label: 'Attack', envelopeSegment: preset.attacks },
  { label: 'Decay', envelopeSegment: preset.decays },
  { label: 'Hold', envelopeSegment: preset.holds },
  { label: 'Release', envelopeSegment: preset.releases },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  if (envelopeSegments[index]) {
    envelopeSegments[index].envelopeSegment.forEach((element, i) => {
      envelopeSegments[index]!.envelopeSegment[i] = updatedArray[i]
    })
  }
}

const lastKeyPressed = ref('1')
const allowedKeys = ['1', '2', '3', '4', '5']

const handleKeydown = (event: KeyboardEvent) => {
  if (allowedKeys.includes(event.key)) {
    lastKeyPressed.value = event.key
  }
}

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
      v-for="(item, index) in envelopeSegments"
      :key="index"
      :index="index"
      :envelopeSegment="item.envelopeSegment"
      :label="item.label"
      @updateEnvelopeSegmentArray="updateEnvelopeSegmentArray(index, $event)"
    />
  </div>
</template>
