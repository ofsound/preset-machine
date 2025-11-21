<script setup lang="ts">
const props = defineProps<{
  type: string
  id: string
}>()

interface ModuleIdentifier {
  id: string
  type: string
}

const modules = defineModel<ModuleIdentifier[]>('modules', { default: [] })
const visibleComponentID = defineModel<string>('visibleComponentID', { default: '' })

const openModule = () => {
  visibleComponentID.value = props.id
}

const deleteModule = () => {
  for (let index = 0; index < modules.value.length; index++) {
    if (modules.value[index]!.id === props.id) {
      modules.value.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="flex">
    <div @click="openModule" class="rounded-sm border bg-slate-100 px-2 py-1">{{ type }}</div>
    <div @click="deleteModule">×</div>
  </div>
</template>
