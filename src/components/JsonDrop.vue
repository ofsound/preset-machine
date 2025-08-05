<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['jsonLoaded'])
const jsonData = ref(null)

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
              emit('jsonLoaded', jsonData.value)
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
    class="rounded-sm border-1 border-dotted bg-gray-200 p-6 text-center italic"
  >
    Drag and Drop JSON File Here
  </div>
</template>

<style scoped></style>
