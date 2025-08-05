<script setup lang="ts">
const emit = defineEmits(['jsonLoaded'])

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    const file = event.dataTransfer.files[0]
    if (file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          if (e.target) {
            if (typeof e.target.result === 'string') {
              emit('jsonLoaded', JSON.parse(e.target.result))
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
    class="flex h-full flex-col justify-center rounded-sm border-1 border-dotted bg-gray-200 p-6 text-center italic"
  >
    <div>Drag and Drop a Sine Machine Preset .json</div>
  </div>
</template>

<style scoped></style>
