<script setup lang="ts">
import { ref } from 'vue'
import AdjustmentSlider from './components/AdjustmentSlider.vue'

const oscTotal = 512
const activeOsc = 8

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

const activeOffsets = ref<number[]>(new Array(activeOsc).fill(0))
const activeHolds = ref<number[]>(new Array(activeOsc).fill(1))
</script>

<template>
  <div v-for="n in activeOsc" :key="n">
    <AdjustmentSlider :offset="activeOffsets[n]" :hold="activeHolds[n]" />
  </div>

  <!-- <div>"offsets": [{{ offsets.join(', ') }}],</div> -->
  <!-- <div>"attacks": [{{ attacks.join(', ') }}],</div>
  <div>"decays": [{{ decays.join(', ') }}],</div>
  <div>"sustains": [{{ sustains.join(', ') }}],</div> -->
  <!-- <div>"holds": [{{ holds.join(', ') }}],</div> -->
  <!-- <div>"releases": [{{ releases.join(', ') }}],</div> -->
</template>

<style scoped></style>
