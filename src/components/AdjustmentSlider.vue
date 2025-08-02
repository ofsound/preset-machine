<script setup lang="ts">
import { ref, onMounted } from 'vue'

const offset = defineModel<number>('offset', { default: 0 })
const hold = defineModel<number>('hold', { default: 0 })
const divisions = defineModel<number>('divisions', { default: 16 })

const gridElement = ref<HTMLElement | null>(null)

onMounted(() => {
  if (gridElement.value) {
    const handleMouseDown = (event: MouseEvent) => {
      const parentLeft = gridElement.value?.getBoundingClientRect().left
      const mouseXRelativeToParent = event.clientX - parentLeft!

      hold.value = 0

      if (gridElement.value?.offsetWidth) {
        const roundToAmount = gridElement.value?.offsetWidth / 16
        offset.value = Math.floor(mouseXRelativeToParent / roundToAmount) * roundToAmount
      }
    }

    const handleMouseUp = (event: MouseEvent) => {
      const parentLeft = gridElement.value?.getBoundingClientRect().left
      const mouseXRelativeToParent = event.clientX - parentLeft!

      if (gridElement.value?.offsetWidth) {
        const roundToAmount = gridElement.value?.offsetWidth / 16
        const dragLength = mouseXRelativeToParent - offset.value
        hold.value = Math.ceil(dragLength / roundToAmount) * roundToAmount
      }
    }

    gridElement.value.addEventListener('mousedown', handleMouseDown)
    gridElement.value.addEventListener('mouseup', handleMouseUp)
  }
})
</script>

<template>
  <div class="relative">
    <div ref="gridElement" class="border-box flex border-1 border-gray-300">
      <div v-for="n in divisions" :key="n" class="grid-child even:bg-gray-100"></div>
      <div class="segment absolute h-[calc(100%-2px)] bg-amber-400"></div>
    </div>
  </div>
</template>

<style scoped>
.segment {
  margin-left: v-bind(offset + 'px');
  width: v-bind(hold + 'px');
}
.grid-child {
  height: auto;
  aspect-ratio: 1;
  width: v-bind((1 / divisions) * 100 + '%');
}
</style>
