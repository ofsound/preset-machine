<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  rowPixelHeight: number
  numRows: number
}>()

const whichRow = (yValue: number) => {
  let biggestBin = 0

  for (let i = 0; i < props.numRows; i++) {
    if (yValue > props.rowPixelHeight * i) {
      biggestBin = i
    }
  }

  return biggestBin
}

const isMouseDown = ref<boolean>(false)
const animationFrameId = ref(0)

const mouseLayerRef = ref<HTMLElement | null>(null)

const handleMouseDown = () => {
  isMouseDown.value = true
  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

let mouseX: number
let mouseY: number

let prevRow: number

function captureMousePosition() {
  const parentTop = mouseLayerRef.value!.getBoundingClientRect().top
  const parentLeft = mouseLayerRef.value!.getBoundingClientRect().left

  const mouseYRelativeToParent = mouseY - parentTop

  const thisRow = whichRow(mouseYRelativeToParent)

  if (thisRow !== prevRow) {
    if (thisRow - prevRow > 1) {
      const numRowsSkipped = thisRow - prevRow
      for (let i = 1; i < numRowsSkipped; i++) {
        console.log('skipped:' + (prevRow + i))
      }
    }

    if (prevRow - thisRow > 1) {
      const numRowsSkipped = prevRow - thisRow
      for (let i = 1; i < numRowsSkipped; i++) {
        console.log('skipped:' + (prevRow - i))
      }
    }

    console.log(thisRow)

    prevRow = whichRow(mouseYRelativeToParent)
  }

  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

const handleMouseUp = () => {
  isMouseDown.value = false
  cancelAnimationFrame(animationFrameId.value)
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
  })
})
</script>

<template>
  <div
    ref="mouseLayerRef"
    class="absolute z-10 h-full w-full bg-violet-200/20"
  ></div>
</template>
