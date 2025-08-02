<script setup lang="ts">
import { ref, computed } from 'vue'
import AdjustmentSlider from './components/AdjustmentSlider.vue'

const oscTotal = 512
const activeOsc = 16

const offsets = ref<number[]>([])
const attacks = ref<number[]>([])
const decays = ref<number[]>([])
const sustains = ref<number[]>([])
const holds = ref<number[]>([])
const releases = ref<number[]>([])

for (let index = 0; index < oscTotal; index++) {
  offsets.value.push(0)
  attacks.value.push(0)
  decays.value.push(0)
  sustains.value.push(0)
  holds.value.push(0)
  releases.value.push(0)
}

const activeOffsets = ref<number[]>(new Array(oscTotal).fill(1))
const activeHolds = ref<number[]>(new Array(oscTotal).fill(1))

const correctedOffsets = computed(() => {
  return activeOffsets.value.map((item) => item / 90) // Example mapping
})

const correctedHolds = computed(() => {
  return activeHolds.value.map((item) => item / 90) // Example mapping
})
</script>

<template>
  <div class="flex flex-col-reverse">
    <AdjustmentSlider
      v-for="n in activeOsc"
      :key="n"
      v-model:offset="activeOffsets[n]"
      v-model:hold="activeHolds[n]"
    />
  </div>

  <br />

  <div>"offsets": [{{ correctedOffsets.join(', ') }}],</div>
  <div>"holds": [{{ correctedHolds.join(', ') }}],</div>
</template>

<style scoped></style>
