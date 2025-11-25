<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

const emit = defineEmits(['jsonLoaded'])

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
              emit('jsonLoaded')
              // still not sure this isn't working, why
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
    class="mx-auto flex h-30 w-60 cursor-pointer flex-col justify-center rounded-sm border border-slate-300 bg-gray-50 p-6 text-center font-semibold italic inset-shadow-sm inset-shadow-slate-400/40 hover:bg-white"
  >
    <div
      class="mx-auto rounded-md border-2 border-dashed border-gray-300 px-4 py-2 font-semibold"
    >
      Drag and Drop Preset .json
    </div>
  </div>
</template>
