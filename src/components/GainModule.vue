<script setup lang="ts">
import { ref } from 'vue'

import GainModuleMenu from '@/components/GainModuleMenu.vue'

import GainColumn from '@/components/GainColumn.vue'

import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types'

const store = useStore()

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

const activeEnvSegmentValues: number[] = [...preset.gains]

const handleColumnValue = (index: number, columnValue: number) => {
  activeEnvSegmentValues[index] = columnValue
  updateEnvelopeSegmentArray(0, activeEnvSegmentValues)
  // emit('updateEnvelopeSegmentArray', activeEnvSegmentValues)
}

function isPrime(n: number) {
  if (n <= 1) return false
  if (n <= 3) return true

  if (n % 2 === 0 || n % 3 === 0) return false

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false
  }

  return true
}
</script>

<template>
  <div class="h-full">
    <div class="mb-3 flex h-full w-full">
      <GainColumn
        v-for="(item, index) in 200"
        :active="isPrime(index)"
        :key="index"
        :color="store.harmonicRowColors[index]!"
        @columnValue="handleColumnValue(index, $event)"
      />
    </div>
    <GainModuleMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />
  </div>
</template>
