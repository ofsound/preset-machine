<script setup lang="ts">
import { ref } from 'vue'

import RandomizeControls from '@/components/RandomizeControls.vue'
import TopMargin from '@/components/TopMargin.vue'
import EnvelopeHarmonicRow from '@/components/EnvelopeHarmonicRow.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  envelopeSegmentValues: number[]
  activeHarmonics: number[]
}>()

const emit = defineEmits(['updateEnvelopeSegmentValues'])

const store = useStore()

const activeEnvSegmentValues: number[] = [...props.envelopeSegmentValues]

const envelopeHarmonicRowRefs = ref<InstanceType<typeof EnvelopeHarmonicRow>[]>(
  [],
)

const setRefs = (
  el: InstanceType<typeof EnvelopeHarmonicRow> | null,
  index: number,
) => {
  if (el) {
    envelopeHarmonicRowRefs.value[index] = el
  }
}

const handleUpdateRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentValues', activeEnvSegmentValues)
}

const randomize = (lowerLimit: number, upperLimit: number) => {
  envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
    if (props.activeHarmonics.includes(index))
      childInstance.setRandomValueInRange(lowerLimit, upperLimit)
  })
}
</script>

<template>
  <div>
    <RandomizeControls @randomize="randomize" />

    <TopMargin />

    <div class="mb-3 flex w-full flex-col-reverse">
      <EnvelopeHarmonicRow
        v-for="(item, index) in 36"
        :key="index"
        :ref="
          (el) => setRefs(el as InstanceType<typeof EnvelopeHarmonicRow>, index)
        "
        :isActive="activeHarmonics.includes(index)"
        :color="store.harmonicRowColors[index]!"
        @updateRowValue="handleUpdateRowValue(index, $event)"
      />
    </div>
  </div>
</template>
