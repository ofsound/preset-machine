<script setup lang="ts">
import { ref, onMounted } from 'vue'

const offset = defineModel<number>('offset', { default: 0 })
const hold = defineModel<number>('hold', { default: 0 })
const divisions = defineModel<number>('divisions', { default: 16 })
const value = defineModel<number>('value', { default: 0 })

const emit = defineEmits(['roundAmount'])

const gridElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

onMounted(async () => {
  if (gridElement.value) {
    const handleMouseDown = async (event: MouseEvent) => {
      const parentLeft = gridElement.value?.getBoundingClientRect().left
      const mouseXRelativeToParent = event.clientX - parentLeft!

      if (gridElement.value?.clientWidth) {
        isMouseDown.value = true
        const roundAmount = gridElement.value.clientWidth / 16
        emit('roundAmount', roundAmount)
        hold.value = value.value * roundAmount
        offset.value = Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount
      }
    }

    const handleMouseUp = () => {
      if (gridElement.value?.offsetWidth) {
        isMouseDown.value = false
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const parentLeft = gridElement.value?.getBoundingClientRect().left
      const mouseXRelativeToParent = event.clientX - parentLeft!

      if (gridElement.value?.offsetWidth && isMouseDown.value && value.value == 1) {
        const roundAmount = gridElement.value?.offsetWidth / 16
        const dragLength = mouseXRelativeToParent - offset.value
        hold.value = Math.ceil(dragLength / roundAmount) * roundAmount
      }
    }

    gridElement.value?.addEventListener('mousedown', handleMouseDown)
    gridElement.value?.addEventListener('mousemove', handleMouseMove)
    gridElement.value?.addEventListener('mouseup', handleMouseUp)
    gridElement.value?.addEventListener('mouseleave', handleMouseUp)
  }
})
</script>

<template>
  <div class="relative max-w-200 cursor-pointer overflow-hidden select-none">
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border-1 border-gray-300 [&>.grid-child:nth-child(4n)]:border-r-2 [&>.grid-child:nth-child(4n)]:border-gray-300"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="grid-child nth-child(4n):border-2 :nth-child(4n):border-blue-400 even:bg-gray-100"
      ></div>
      <div class="segment absolute h-[calc(100%-2px)] bg-amber-400"></div>
    </div>
  </div>
</template>

<style scoped>
/* just put these as computed styles up above, right? */

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
