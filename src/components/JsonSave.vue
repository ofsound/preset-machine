<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  jsonData: Object,
})

const downloadJson = () => {
  const jsonString = JSON.stringify(props.jsonData, null, 2) // null, 2 for pretty-printing

  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = props.jsonData?.name + '.json' // Desired filename for the downloaded file

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <button @click="downloadJson">Download JSON</button>
</template>

<style scoped></style>
