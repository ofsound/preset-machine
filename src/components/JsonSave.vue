<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'

const { corePreset } = usePreset()

const downloadJson = () => {
  const jsonString = JSON.stringify(preset, null, 2)

  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = corePreset.name + '.json'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button
    class="block cursor-pointer rounded-md bg-green-400 px-4 py-1 text-sm font-semibold tracking-wide text-white text-shadow-xs hover:text-shadow-lg"
    @click="downloadJson"
  >
    Download .json
  </button>
</template>
