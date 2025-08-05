<script setup lang="ts">
import { defineProps } from 'vue'
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
  <button class="underline" @click="downloadJson">Download JSON</button>
</template>

<style scoped></style>
