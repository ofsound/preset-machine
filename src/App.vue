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

const activeOffsets = ref<number[]>(new Array(activeOsc).fill(1))
const activeHolds = ref<number[]>(new Array(activeOsc).fill(1))
</script>

<template>
  <div v-for="n in activeOsc" :key="n">
    <AdjustmentSlider v-model:offset="activeOffsets[n]" v-model:hold="activeHolds[n]" />
  </div>

  <br />

  <div>"offsets": [{{ activeOffsets.join(', ') }}],</div>
  <div>"holds": [{{ activeHolds.join(', ') }}],</div>
</template>

<style scoped></style>
