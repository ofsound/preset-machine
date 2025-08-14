<script setup lang="ts">
import { usePreset } from '@/composables/usePreset'

const { preset } = usePreset()

const downloadJson = () => {
  let numZeros = 512 - preset.offsets.length
  let zerosToAdd = new Array(numZeros).fill(0)
  preset.offsets = preset.offsets.concat(zerosToAdd)

  numZeros = 512 - preset.gains.length
  zerosToAdd = new Array(numZeros).fill(1)
  preset.gains = preset.gains.concat(zerosToAdd)

  numZeros = 512 - preset.holds.length
  zerosToAdd = new Array(numZeros).fill(0)
  preset.holds = preset.holds.concat(zerosToAdd)

  numZeros = 512 - preset.attacks.length
  zerosToAdd = new Array(numZeros).fill(0)
  preset.attacks = preset.attacks.concat(zerosToAdd)

  numZeros = 512 - preset.decays.length
  zerosToAdd = new Array(numZeros).fill(0)
  preset.decays = preset.decays.concat(zerosToAdd)

  numZeros = 512 - preset.releases.length
  zerosToAdd = new Array(numZeros).fill(0)
  preset.releases = preset.releases.concat(zerosToAdd)

  numZeros = 512 - preset.sustains.length
  zerosToAdd = new Array(numZeros).fill(0)
  preset.sustains = preset.sustains.concat(zerosToAdd)

  const jsonString = JSON.stringify(preset, null, 2)

  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = preset.name + '.json'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button
    class="mb-4 block cursor-pointer rounded-md border-1 bg-green-400 px-4 py-1 text-sm text-white"
    @click="downloadJson"
  >
    Download {{ '.json' }}
  </button>
</template>
