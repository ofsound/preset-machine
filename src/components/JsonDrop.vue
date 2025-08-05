<script setup lang="ts">
import { ref } from 'vue'

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
              console.log('JSON data:', jsonData.value)
            }
          }
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
</script>

<template>
  <div @dragover.prevent @drop.prevent="handleDrop" class="drop-zone">
    Drag and Drop JSON File Here
  </div>
</template>

<style scoped></style>
