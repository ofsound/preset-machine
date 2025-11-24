<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

import FreeformModuleMenu from '@/components/FreeformModuleMenu.vue'
import FreeformEnvelope from '@/components/FreeformEnvelope.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import type { EnvelopeLabelAndSegment } from '@/types'

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Offset', envelopeSegment: preset.offsets },
  { label: 'Attack', envelopeSegment: preset.attacks },
  { label: 'Decay', envelopeSegment: preset.decays },
  { label: 'Hold', envelopeSegment: preset.holds },
  { label: 'Release', envelopeSegment: preset.releases },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  if (envelopeSegments[index]) {
    envelopeSegments[index].envelopeSegment.forEach((element, i) => {
      if (updatedArray[i])
        envelopeSegments[index]!.envelopeSegment[i] = updatedArray[i]
    })
  }
}

const lastKeyPressed = ref('1')

const lastMenuButtonClickedLabel = ref('Offset')

const allowedKeys = ['1', '2', '3', '4', '5']

const handleKeydown = (event: KeyboardEvent) => {
  if (allowedKeys.includes(event.key)) {
    lastKeyPressed.value = event.key
  }
}

const menuButtonClicked = (item: EnvelopeLabelAndSegment) => {
  lastMenuButtonClickedLabel.value = item.label
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div>
    <FreeformModuleMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
    />
    <div class="flex">
      <FreeformEnvelope
        v-for="(item, index) in envelopeSegments"
        v-show="lastMenuButtonClickedLabel === item.label"
        :key="index"
        :index="index"
        :envelopeSegment="item.envelopeSegment"
        :label="item.label"
        @updateEnvelopeSegmentArray="updateEnvelopeSegmentArray(index, $event)"
      />
    </div>
  </div>
</template>
