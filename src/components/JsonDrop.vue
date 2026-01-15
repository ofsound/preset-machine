<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import EnvelopesModule from '@/components/module/EnvelopesModule.vue'

import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

import type { PresetModLayer } from '@/types.ts'

const store = useStore()

const emit = defineEmits(['jsonLoaded'])

const { corePreset, presetModLayers } = usePreset()

const fileInput = ref<HTMLInputElement | null>(null)

const isDragOver = ref(false)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileSelect = async (e: Event) => {
  const inputElement = e.target as HTMLInputElement
  if (inputElement.files) {
    handleImportedJSON(inputElement.files[0] as File)
    inputElement.value = ''
  }
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    handleImportedJSON(event.dataTransfer.files[0] as File)
  }
}

const handleImportedJSON = (file: File) => {
  if (file && file.type === 'application/json') {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        if (e.target) {
          if (typeof e.target.result === 'string') {
            Object.assign(corePreset, JSON.parse(e.target.result))

            const idForNewComponent = uuidv4()

            store.modules.push({
              component: EnvelopesModule,
              id: idForNewComponent,
            })
            store.visibleModuleID = idForNewComponent

            const presetModLayer: PresetModLayer = {
              moduleID: idForNewComponent,

              gains: [...corePreset.gains],
              sustains: [...corePreset.sustains],
              offsets: [...corePreset.offsets],
              attacks: [...corePreset.attacks],
              decays: [...corePreset.decays],
              holds: [...corePreset.holds],
              releases: [...corePreset.releases],
            }

            corePreset.gains = Array(511).fill(0)
            corePreset.sustains = Array(511).fill(0)
            corePreset.offsets = Array(511).fill(0)
            corePreset.attacks = Array(511).fill(0)
            corePreset.decays = Array(511).fill(0)
            corePreset.holds = Array(511).fill(0)
            corePreset.releases = Array(511).fill(0)

            presetModLayers.push(presetModLayer)

            emit('jsonLoaded')
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
</script>

<template>
  <div
    @dragover.prevent
    @dragenter.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
    class="mx-auto flex h-36 w-60 cursor-pointer flex-col justify-center rounded-sm border border-slate-300 bg-gray-50 p-6 text-center font-semibold italic inset-shadow-sm inset-shadow-slate-400/40 hover:bg-white"
    :class="{
      'bg-white': isDragOver,
    }"
  >
    <div
      class="pointer-events-none mx-auto rounded-md border-2 border-dashed border-slate-200 px-4 py-2 font-semibold"
    >
      Drag and Drop Preset JSON<br />
      or Click Here
    </div>
  </div>
  <input
    name="file-input"
    id="file-input"
    type="file"
    ref="fileInput"
    @change="handleFileSelect"
    accept="application/json"
    class="hidden"
  />
</template>
