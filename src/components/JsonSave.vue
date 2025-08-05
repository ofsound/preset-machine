<script setup lang="ts">
import type { SineMachinePreset } from '../types/SineMachinePreset.ts'

interface MyComponentProps {
  jsonData: SineMachinePreset
}

const props = defineProps<MyComponentProps>()

const downloadJson = () => {
  const jsonString = JSON.stringify(props.jsonData, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = props.jsonData.name + '.json'

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
    Download {{ props.jsonData.name + '.json' }}
  </button>
</template>

<style scoped></style>
