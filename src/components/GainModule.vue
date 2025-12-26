<script setup lang="ts">
import { ref } from 'vue'

import FreeformGains from '@/components/FreeformGains.vue'
import GainModuleMenu from '@/components/GainModuleMenu.vue'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types'

const { preset } = usePreset()

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Gains', envelopeSegment: preset.gains },
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
</script>

<template>
  <div class="h-full">
    <div class="mt-4 flex h-80">
      <FreeformGains
        v-for="(item, index) in envelopeSegments"
        v-show="lastMenuButtonClickedLabel === item.label"
        :key="index"
        :index="index"
        :envelopeSegment="item.envelopeSegment"
        @updateEnvelopeSegmentArray="updateEnvelopeSegmentArray(index, $event)"
      />
    </div>
    <GainModuleMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />
  </div>
</template>
