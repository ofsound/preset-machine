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

const handleRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentValues', activeEnvSegmentValues)
}

const childRefs = ref<InstanceType<typeof EnvelopeHarmonicRow>[]>([])

const setChildRef = (
  el: InstanceType<typeof EnvelopeHarmonicRow> | null,
  index: number,
) => {
  if (el) {
    childRefs.value[index] = el
  }
}

const randomize = (lowerLimit: number, upperLimit: number) => {
  childRefs.value.forEach((childInstance, index) => {
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
        v-for="(item, index) in 100"
        :key="index"
        :ref="
          (el) =>
            setChildRef(el as InstanceType<typeof EnvelopeHarmonicRow>, index)
        "
        :isActive="activeHarmonics.includes(index)"
        :color="store.harmonicRowColors[index]!"
        @rowValue="handleRowValue(index, $event)"
      />
    </div>
  </div>
</template>
