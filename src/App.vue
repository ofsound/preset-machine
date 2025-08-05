<script setup lang="ts">
import { ref, computed } from 'vue'
import AdjustmentSlider from './components/AdjustmentSlider.vue'
import JsonDrop from './components/JsonDrop.vue'

const oscTotal = 8
const activeOsc = 8

const selectedValue = ref<number>()
const tempo = ref<number>(120)

const activeOffsets = ref<number[]>(new Array(oscTotal).fill(1))
const activeHolds = ref<number[]>(new Array(oscTotal).fill(1))

const correctedOffsets = computed(() => {
  return activeOffsets.value.map((item) => item / 90)
})

const correctedHolds = computed(() => {
  return activeHolds.value.map((item) => item / 90)
})

const options = ref([
  { text: '8th', value: 2 },
  { text: 'Dotted 8th', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
  { text: 'drag', value: 1 },
])

// const downloadJson = () => {
//   const jsonString = JSON.stringify(jsonData.value, null, 2) // null, 2 for pretty-printing

//   const blob = new Blob([jsonString], { type: 'application/json' })

//   const url = URL.createObjectURL(blob)

//   const link = document.createElement('a')
//   link.href = url
//   link.download = jsonData.value.name + '.json' // Desired filename for the downloaded file

//   document.body.appendChild(link)
//   link.click()

//   document.body.removeChild(link)
//   URL.revokeObjectURL(url)
// }

// watch(correctedOffsets, () => {
//   if (jsonData.value) {
//     jsonData.value.offsets.splice(0, 8, ...correctedOffsets.value)
//     jsonData.value.holds.splice(0, 8, ...correctedHolds.value)
//   }
// })
</script>

<template>
  <JsonDrop />

  <!-- <button @click="downloadJson">Download JSON</button> -->

  <div class="ml-a mr-a flex max-w-200 flex-col-reverse">
    <AdjustmentSlider
      v-for="n in activeOsc"
      :key="n"
      v-model:offset="activeOffsets[n]"
      v-model:hold="activeHolds[n]"
      v-model:value="selectedValue"
    />
  </div>

  <input type="text" v-model="tempo" />

  <br />

  <select id="myDropdown" v-model="selectedValue">
    <option value="" disabled>Please select one</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>

  <br />

  <br />
  <br />
  <br />

  <div>"offsets": [{{ correctedOffsets.join(', ') }}],</div>
  <div>"holds": [{{ correctedHolds.join(', ') }}],</div>

  <div>
    <!-- {{ JSON.stringify(jsonData, null, 2) }} -->
  </div>
</template>

<style scoped></style>
