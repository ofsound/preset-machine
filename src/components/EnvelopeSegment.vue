<script setup lang="ts">
import { ref } from 'vue'

import TopMargin from '@/components/TopMargin.vue'
import EnvelopeHarmonicRow from '@/components/EnvelopeHarmonicRow.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  envelopeSegment: number[]
  numHarmonics: number
  activeHarmonics: number[]
}>()

const emit = defineEmits(['updateEnvelopeSegmentArray'])

const store = useStore()

const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

const handleRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentArray', activeEnvSegmentValues)
}

const lowerLimit = ref(0)
const upperLimit = ref(0)

const childRefs = ref<InstanceType<typeof EnvelopeHarmonicRow>[]>([])

const setChildRef = (
  el: InstanceType<typeof EnvelopeHarmonicRow> | null,
  index: number,
) => {
  if (el) {
    childRefs.value[index] = el
  }
}

const randomize = () => {
  childRefs.value.forEach((childInstance, index) => {
    if (props.activeHarmonics.includes(index))
      childInstance.setRandomValueInRange(lowerLimit.value, upperLimit.value)
  })
}
</script>

<template>
  <div>
    <div class="mb-4 flex justify-center gap-2 border">
      <input
        class="w-16 bg-slate-200"
        type="number"
        :id="'lower-limit'"
        :name="'lower-limit'"
        v-model="lowerLimit"
      />
      <input
        class="w-16 bg-slate-200"
        type="number"
        :id="'upper-limit'"
        :name="'upper-limit'"
        v-model="upperLimit"
      />
      <button
        @click="randomize"
        class="cursor-pointer rounded-sm border bg-sky-50 px-3 py-px text-sm font-semibold tracking-wide"
      >
        Randomize
      </button>
    </div>

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
