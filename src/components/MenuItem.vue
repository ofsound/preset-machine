<script setup lang="ts">
const props = defineProps<{
  type: string
}>()

const openModule = () => {
  console.log('open me ' + props.type)
}
</script>

<template>
  <div class="flex">
    <div @click="openModule" class="border px-2">{{ type }}</div>
    <div>X</div>
  </div>
</template>
