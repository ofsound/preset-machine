<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    const file = event.dataTransfer.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          if (e.target) {
            if (typeof e.target.result === 'string') {
              Object.assign(preset, JSON.parse(e.target.result))
              // still not sure this is working, why
              // would i need the watch in Preset Inspector
            }
          }
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }
      reader.readAsText(file)
    } else {
      console.error('Not a JSON file!')
    }
  }
}
</script>

<template>
  <div
    @dragover.prevent
    @drop.prevent="handleDrop"
    class="mx-auto flex w-max flex-col justify-center rounded-sm border bg-gray-200 p-6 text-center italic"
  >
    <div class="mx-auto w-max rounded-md border border-dashed px-4 py-2">
      Drag and Drop a Sine Machine Preset .json
    </div>
  </div>
</template>
