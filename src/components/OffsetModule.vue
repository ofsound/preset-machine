<script setup lang="ts">
import { ref } from 'vue'

import OffsetDecayRow from '@/components/OffsetDecayRow.vue'

import { usePreset } from '@/composable/usePreset.ts'

const { preset } = usePreset()

const toolOptionValue = ref<number>(1)

const toolOptions = ref([
  { text: '1/16 & drag', value: 1 },
  { text: '1/8', value: 2 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
])

const numHarmonics = ref<number>(8)
const tempo = ref<number>(120)

const updateEnvelopeOffset = (index: number, offset: number) => {
  preset.offsets[index] = offset / (tempo.value * 4)
}

const updateEnvelopeDecay = (index: number, decay: number) => {
  preset.decays[index] = decay / (tempo.value * 4)
}
</script>

<template>
  <div>
    <div class="flex rounded-sm bg-gray-200 p-4">
      <div>
        Harmonics:
        <input
          class="max-w-14 rounded-sm bg-gray-300 p-1"
          type="number"
          v-model="numHarmonics"
        />
      </div>
      <div class="ml-4">
        Tempo:
        <input
          class="max-w-14 rounded-sm bg-gray-300 p-1"
          type="number"
          v-model="tempo"
        />
      </div>
      <div class="ml-auto">
        Hold Length:&nbsp;&nbsp;
        <select
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
    </div>
    <div class="mx-auto mt-4 mb-10 flex flex-col-reverse">
      <OffsetDecayRow
        v-for="(item, index) in numHarmonics"
        :key="item"
        :value="toolOptionValue"
        :index="index"
        @updateEnvelopeOffset="updateEnvelopeOffset(index, $event)"
        @updateEnvelopeDecay="updateEnvelopeDecay(index, $event)"
      />
    </div>
  </div>
</template>
