<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  segment: {
    type: Array<number>,
    default: new Array(512).fill(0),
  },
  label: {
    type: String,
  },
})

const lowerLimit = ref(0)
const upperLimit = ref(0)

const activeOffsets = ref<number[]>([...props.segment])

const randomize = () => {
  activeOffsets.value.forEach((element, index, array) => {
    const randomizeRange = upperLimit.value / 10 - lowerLimit.value / 10

    const randomDeltaWithinRange = Math.random() * randomizeRange

    const randomValueWithinRange = randomDeltaWithinRange + lowerLimit.value / 10

    const thisValue = array[index]

    const newValue = thisValue! + randomValueWithinRange

    if (newValue < 0) {
      array[index] = 0
    } else {
      array[index] = newValue
    }
  })

  const propsArray: number[] = props.segment

  propsArray.splice(0, 36, ...activeOffsets.value)
  // this is probably wrong, bad practice, sneakily changing values
  // the whole point of the pinia store is that i have direct access
}
</script>

<template>
  <div class="w-full">
    <div>{{ label }}</div>
    <div class="flex gap-2">
      <input class="w-10 bg-slate-200" type="number" id="lowerLimit" v-model="lowerLimit" />
      <input class="w-10 bg-slate-200" type="number" id="upperLimit" v-model="upperLimit" />
      <button @click="randomize" class="mb-1 border px-1">Randomize</button>
    </div>
  </div>
</template>
