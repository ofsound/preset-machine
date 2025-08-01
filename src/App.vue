<script setup lang="ts">
import { ref } from 'vue'
const oscTotal = 512

const offsetArray = ref<number[]>([])
const attacksArray = ref<number[]>([])
const decaysArray = ref<number[]>([])
const sustainsArray = ref<number[]>([])
const holdsArray = ref<number[]>([])
const releasesArray = ref<number[]>([])

for (let index = 0; index < oscTotal; index++) {
  if (index % 2 === 0) {
    offsetArray.value.push(index * 0.01)
    attacksArray.value.push(index * 0.01)
    decaysArray.value.push(index * 0.01)
    sustainsArray.value.push(index * 0.01)
    holdsArray.value.push(index * 0.01)
    releasesArray.value.push(index * 0.01)
  } else {
    offsetArray.value.push(index * 0.05)
    attacksArray.value.push(index * 0.05)
    decaysArray.value.push(index * 0.05)
    sustainsArray.value.push(index * 0.05)
    holdsArray.value.push(index * 0.05)
    releasesArray.value.push(index * 0.05)
  }
}
</script>

<template>
  <div>"offsets": [{{ offsetArray.join(', ') }}],</div>
  <div>"attacks": [{{ attacksArray.join(', ') }}],</div>
  <div>"decays": [{{ decaysArray.join(', ') }}],</div>
  <div>"sustains": [{{ sustainsArray.join(', ') }}],</div>
  <div>"holds": [{{ holdsArray.join(', ') }}],</div>
  <div>"releases": [{{ releasesArray.join(', ') }}],</div>
</template>

<style scoped></style>
