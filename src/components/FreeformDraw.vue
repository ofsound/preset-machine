<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DrawSlider from './DrawSlider.vue'

const props = defineProps({
  segment: {
    type: Array<number>,
    default: new Array(512).fill(0),
  },
})

const numHarmonics = ref<number>(36)
const tempo = ref<number>(120)

const handleRoundAmount = (roundAmountEmitted: number) => {
  roundAmount.value = roundAmountEmitted
}

const activeOffsets = ref<number[]>([...props.segment])
const roundAmount = ref<number>(0)

const drawElement = ref<HTMLElement | null>(null)

onMounted(() => {
  if (drawElement.value) {
    const handleMouseLeave = () => {
      if (activeOffsets.value) {
        const correctedOffsets = activeOffsets.value.map(
          (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
        )
        const propsArray: number[] = props.segment

        propsArray.splice(0, numHarmonics.value, ...correctedOffsets)
      }
    }

    drawElement.value.addEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<template>
  <div class="w-full">
    <div class="mx-auto mt-4 mb-10 flex flex-col-reverse" ref="drawElement">
      <DrawSlider
        v-for="(n, i) in numHarmonics"
        :key="n"
        v-model:offset="activeOffsets[i]"
        @roundAmount="handleRoundAmount"
      />
    </div>
  </div>
</template>
