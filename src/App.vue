<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import AdjustmentSlider from './components/AdjustmentSlider.vue'

const oscTotal = 8
const activeOsc = 8

const offsets = ref<number[]>([])
const attacks = ref<number[]>([])
const decays = ref<number[]>([])
const sustains = ref<number[]>([])
const holds = ref<number[]>([])
const releases = ref<number[]>([])

const selectedValue = ref<number>()
const tempo = ref<number>(120)

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

const jsonData = ref(null) // To store the parsed JSON data

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    if (file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          if (e.target) {
            if (typeof e.target.result === 'string') {
              jsonData.value = JSON.parse(e.target.result)
              console.log('JSON data:', jsonData.value)
            }
          }

          // You can now use jsonData.value in your component
        } catch (error) {
          console.error('Error parsing JSON:', error)
          alert('Invalid JSON file.')
        }
      }
      reader.readAsText(file)
    } else {
      alert('Please drop a JSON file.')
    }
  }
}

watch(correctedOffsets, () => {
  if (jsonData.value) {
    jsonData.value.offsets.splice(0, 8, ...correctedOffsets.value)
    jsonData.value.holds.splice(0, 8, ...correctedHolds.value)
  }
})

const downloadJson = () => {
  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonData.value, null, 2) // null, 2 for pretty-printing

  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: 'application/json' })

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob)

  // Create a temporary anchor element
  const link = document.createElement('a')
  link.href = url
  link.download = 'preset.json' // Desired filename for the downloaded file

  // Programmatically click the link to trigger the download
  document.body.appendChild(link) // Append to body to ensure it's in the DOM
  link.click()

  // Clean up: remove the link and revoke the URL
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div @dragover.prevent @drop.prevent="handleDrop" class="drop-zone">
    Drag and Drop JSON File Here
    <br />
    <br />
  </div>

  <button @click="downloadJson">Download JSON</button>

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

  <div>
    {{ JSON.stringify(jsonData, null, 2) }}
  </div>

  <!-- <div>"offsets": [{{ correctedOffsets.join(', ') }}],</div>
  <div>"holds": [{{ correctedHolds.join(', ') }}],</div> -->
</template>

<style scoped></style>
