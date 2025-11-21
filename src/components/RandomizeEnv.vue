<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  segment: {
    type: Array<number>,
    default: new Array(512).fill(0),
  },
})

const activeOffsets = ref<number[]>([...props.segment])

console.log(activeOffsets.value)

const randomize = () => {
  activeOffsets.value.forEach((element, index, array) => {
    array[index] = Math.floor(Math.random() * 10) + 1
  })

  const propsArray: number[] = props.segment

  propsArray.splice(0, 36, ...activeOffsets.value)
}
</script>

<template>
  <div class="w-full">
    <button @click="randomize" class="mb-1 border px-1">Randomize</button>
  </div>
</template>
