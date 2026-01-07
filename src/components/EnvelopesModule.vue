<script setup lang="ts">
import { ref } from 'vue'

import EnvelopeSegmentMenu from '@/components/EnvelopeSegmentMenu.vue'
import EnvelopeSegment from '@/components/EnvelopeSegment.vue'
import ActiveHarmonics from '@/components//ActiveHarmonics.vue'
import TempoGridControls from '@/components//TempoGridControls.vue'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const { corePreset } = usePreset()

const activeHarmonics = ref<number[]>(
  Array.from({ length: 511 }, (_, i) => i + 1),
)

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Offset', envelopeSegment: corePreset.offsets },
  { label: 'Attack', envelopeSegment: corePreset.attacks },
  { label: 'Decay', envelopeSegment: corePreset.decays },
  { label: 'Hold', envelopeSegment: corePreset.holds },
  { label: 'Release', envelopeSegment: corePreset.releases },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  envelopeSegments[index]!.envelopeSegment.splice(
    0,
    updatedArray.length,
    ...updatedArray,
  )
}

const lastMenuButtonClickedLabel = ref('Offset')

const menuButtonClicked = (item: EnvelopeLabelAndSegment) => {
  lastMenuButtonClickedLabel.value = item.label
}

function handleActiveHarmonicsUpdate(newArray: number[]) {
  activeHarmonics.value = [...newArray]
}
</script>

<template>
  <div>
    <TempoGridControls />

    <ActiveHarmonics @update:active-harmonics="handleActiveHarmonicsUpdate" />

    <EnvelopeSegmentMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />

    <div class="mt-4 w-full">
      <EnvelopeSegment
        v-for="(item, index) in envelopeSegments"
        v-show="lastMenuButtonClickedLabel === item.label"
        :key="index"
        :numHarmonics="36"
        :activeHarmonics
        :envelopeSegment="item.envelopeSegment"
        @updateEnvelopeSegmentArray="updateEnvelopeSegmentArray(index, $event)"
      />
    </div>
  </div>
</template>
