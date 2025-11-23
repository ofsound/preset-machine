<script setup lang="ts">
// import { ref } from 'vue'

import FreeformDrawSlider from '@/components/FreeformDrawSlider.vue'

const props = defineProps({
  // index: {
  //   type: Number,
  // },
  envSegment: {
    type: Array<number>,
    default: new Array(512).fill(0),
  },
  label: {
    type: String,
  },
})

const emit = defineEmits(['updateEnvSegmentArray'])

const activeEnvSegmentValues: number[] = [...props.envSegment]

const handleRowValue = (index: number, rowValue: number) => {
  // console.log(index + ' ' + rowValue)

  activeEnvSegmentValues[index] = rowValue

  emit('updateEnvSegmentArray', activeEnvSegmentValues)

  // roundAmount.value = roundAmountEmitted
}

// const lowerLimit = ref(0)
// const upperLimit = ref(0)

// const activeEnvSegmentValues: number[] = [...props.envSegment]

// const randomize = () => {
//   activeEnvSegmentValues.forEach((element, index, array) => {
//     const randomizeRange = upperLimit.value / 10 - lowerLimit.value / 10

//     const randomDeltaWithinRange = Math.random() * randomizeRange

//     const randomValueWithinRange =
//       randomDeltaWithinRange + lowerLimit.value / 10

//     const thisValue = array[index]

//     const newValue = thisValue! + randomValueWithinRange

//     if (newValue < 0) {
//       array[index] = 0
//     } else {
//       array[index] = newValue
//     }
//   })

//   props.updateEnvSegmentArray(props.index, activeEnvSegmentValues)
// }
</script>

<template>
  <div class="mb-3 w-full">
    <div class="mb-1 font-semibold">{{ label }}</div>
    <FreeformDrawSlider
      v-for="(item, index) in 36"
      :key="index"
      :index="index"
      @rowValue="handleRowValue(index, $event)"
    />
  </div>
</template>
