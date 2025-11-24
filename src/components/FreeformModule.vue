<script setup lang="ts">
import { ref } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

import FreeformModuleMenu from '@/components/FreeformModuleMenu.vue'
import FreeformEnvelopeSegment from '@/components/FreeformEnvelopeSegment.vue'
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

const lastMenuButtonClickedLabel = ref('Offset')

const menuButtonClicked = (item: EnvelopeLabelAndSegment) => {
  lastMenuButtonClickedLabel.value = item.label
}
</script>

<template>
  <div>
    <FreeformModuleMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />
    <div class="mt-4 flex">
      <FreeformEnvelopeSegment
        v-for="(item, index) in envelopeSegments"
        v-show="lastMenuButtonClickedLabel === item.label"
        :key="index"
        :index="index"
        :envelopeSegment="item.envelopeSegment"
        @updateEnvelopeSegmentArray="updateEnvelopeSegmentArray(index, $event)"
      />
    </div>
  </div>
</template>
