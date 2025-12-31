<script setup lang="ts">
import { ref } from 'vue'

// import AbsoluteRelativeMenu from '@/components/AbsoluteRelativeMenu.vue'
import EnvelopeSegmentMenu from '@/components/EnvelopeSegmentMenu.vue'
import EnvelopeSegment from '@/components/EnvelopeSegment.vue'
import ActiveHarmonicsMenu from './ActiveHarmonicsMenu.vue'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const { corePreset } = usePreset()

const activeHarmonicsMode: Array<{ label: string }> = [
  { label: 'All' },
  { label: 'Odd' },
  { label: 'Even' },
  { label: 'Octaves' },
  { label: 'Not Octaves' },
  { label: 'Not Fifths' },
  { label: 'Fifths' },
  { label: 'Prime' },
  { label: 'List' },
]

const toolOptionValue = ref<number>(1)

const toolOptions = ref([
  { text: '1/32', value: 1 },
  { text: '1/16', value: 1 },
  { text: '1/8', value: 2 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
  { text: 'none', value: 8 },
])

const numHarmonics = ref<number>(8)
const tempo = ref<number>(120)

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
</script>

<template>
  <div>
    <div class="flex rounded-sm bg-gray-200 p-4">
      <div class="">
        Tempo:
        <input
          name="tempo"
          id="tempo"
          class="max-w-14 rounded-sm bg-gray-300 p-1"
          type="number"
          v-model="tempo"
        />
      </div>
      <div class="">
        Grid:&nbsp;&nbsp;
        <select
          name="hold-length"
          id="hold-length"
          class="bg-gray-3 rounded-sm bg-gray-300 p-1 text-black"
          v-model="toolOptionValue"
        >
          <option value="-1" disabled>Hold note value</option>
          <option
            v-for="toolOption in toolOptions"
            :key="toolOption.value"
            :value="toolOption.value"
          >
            {{ toolOption.text }}
          </option>
        </select>
      </div>
      <!-- <div class="mb-4 ml-auto flex justify-center">
        <AbsoluteRelativeMenu />
      </div> -->
    </div>
    <div>
      Max Harmonics:
      <input
        name="num-harmonics"
        id="num-harmonics"
        class="max-w-14 rounded-sm bg-gray-300 p-1"
        type="number"
        v-model="numHarmonics"
      />
    </div>

    <ActiveHarmonicsMenu
      :activeHarmonicsMode="activeHarmonicsMode"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />

    <hr class="mb-4" />

    <EnvelopeSegmentMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />

    <div class="my-4 flex justify-center">
      <div>Randomize Functions for Envelope Segments</div>
    </div>

    <div class="mt-4 flex">
      <EnvelopeSegment
        v-for="(item, index) in envelopeSegments"
        v-show="lastMenuButtonClickedLabel === item.label"
        :key="index"
        :envelopeSegment="item.envelopeSegment"
        @updateEnvelopeSegmentArray="updateEnvelopeSegmentArray(index, $event)"
      />
    </div>
  </div>
</template>
