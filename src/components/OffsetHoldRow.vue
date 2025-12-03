<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { useStore } from '@/stores/store'
const store = useStore()

const emit = defineEmits(['updateEnvelopeOffset', 'updateEnvelopeHold'])

const offset = ref(0)
const hold = ref(0)
const divisions = ref(16)

const value = defineModel<number>('value', { default: 0 })

const gridElement = ref<HTMLElement | null>(null)
const isMouseDown = ref<boolean>(false)

const props = defineProps<{
  index: number
}>()

onMounted(() => {
  if (gridElement.value) {
    const handleMouseDown = (event: MouseEvent) => {
      if (gridElement.value?.clientWidth) {
        const parentLeft = gridElement.value.getBoundingClientRect().left
        const mouseXRelativeToParent = event.clientX - parentLeft!
        isMouseDown.value = true
        const roundAmount = gridElement.value.clientWidth / 16
        hold.value = value.value * roundAmount
        offset.value =
          Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

        emit('updateEnvelopeOffset', offset.value)
        emit('updateEnvelopeHold', hold.value)
      }
    }

    const handleMouseUp = () => {
      if (gridElement.value?.offsetWidth) {
        isMouseDown.value = false
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (
        gridElement.value?.offsetWidth &&
        isMouseDown.value &&
        value.value == 1
      ) {
        const parentLeft = gridElement.value.getBoundingClientRect().left
        const mouseXRelativeToParent = event.clientX - parentLeft!
        const roundAmount = gridElement.value?.offsetWidth / 16
        const dragLength = mouseXRelativeToParent - offset.value
        hold.value = Math.ceil(dragLength / roundAmount) * roundAmount
        emit('updateEnvelopeHold', hold.value)
      }
    }

    gridElement.value.addEventListener('mousedown', handleMouseDown)
    gridElement.value.addEventListener('mousemove', handleMouseMove)
    gridElement.value.addEventListener('mouseup', handleMouseUp)
    gridElement.value.addEventListener('mouseleave', handleMouseUp)
  }
})

const segmentStyle = computed(() => {
  return {
    marginLeft: `${offset.value}px`,
    width: `${hold.value}px`,
    backgroundColor: store.harmonicRowColorsReversed[props.index],
  }
})

const gridChildStyle = computed(() => {
  return {
    width: `${(1 / divisions.value) * 100}%`,
  }
})
</script>

<template>
  <div class="relative max-w-200 cursor-pointer overflow-hidden select-none">
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300 [&>.grid-child:nth-child(4n)]:border-r-2 [&>.grid-child:nth-child(4n)]:border-gray-300"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="nth-child(4n):border-2 :nth-child(4n):border-blue-400 aspect-square h-auto even:bg-gray-100"
        :style="gridChildStyle"
      ></div>
      <div class="absolute h-[calc(100%-2px)]" :style="segmentStyle"></div>
    </div>
  </div>
</template>
