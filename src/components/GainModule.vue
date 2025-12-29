<script setup lang="ts">
import { ref } from 'vue'

import GainModuleMenu from '@/components/GainModuleMenu.vue'

import GainColumn from '@/components/GainColumn.vue'

import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

import { isPrime } from '@/utils/math.ts'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const store = useStore()

const { corePreset } = usePreset()

const gainModuleModes: Array<{ label: string }> = [
  { label: 'All' },
  { label: 'Octaves' },
  { label: 'Not Octaves' },
  { label: 'Not Fifths' },
  { label: 'Fifths' },
  { label: 'Prime' },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  corePreset.gains.splice(0, updatedArray.length, ...updatedArray)
}

const lastMenuButtonClickedLabel = ref('Offset')

const menuButtonClicked = (item: EnvelopeLabelAndSegment) => {
  lastMenuButtonClickedLabel.value = item.label
}

const activeEnvSegmentValues: number[] = [...corePreset.gains]

const handleColumnValue = (index: number, columnValue: number) => {
  activeEnvSegmentValues[index] = columnValue
  updateEnvelopeSegmentArray(0, activeEnvSegmentValues)
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
      :gainModuleModes="gainModuleModes"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />
  </div>
</template>
