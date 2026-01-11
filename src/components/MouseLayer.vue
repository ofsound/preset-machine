<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  rowPixelHeight: number
  numRows: number
}>()

const emit = defineEmits(['newValueFromMouseLayer'])

const animationFrameId = ref(0)

const mouseLayerRef = ref<HTMLElement | null>(null)

let mouseX: number
let mouseY: number

let prevRow: number
let prevRowX: number

const handleMouseDown = () => {
  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

const whichRow = (yValue: number) => {
  let biggestBin = 0

  for (let i = 0; i < props.numRows; i++) {
    if (yValue > props.rowPixelHeight * i) {
      biggestBin = i
    }
  }
  return biggestBin
}

function captureMousePosition() {
  const parentBottom = mouseLayerRef.value!.getBoundingClientRect().bottom
  const parentLeft = mouseLayerRef.value!.getBoundingClientRect().left

  const mouseXRelativeToParent = mouseX - parentLeft
  const mouseYRelativeToParent = parentBottom - mouseY

  const thisRow = whichRow(mouseYRelativeToParent)

  if (thisRow !== prevRow) {
    const zoneWidth = (mouseLayerRef.value!.clientWidth - 24) / 2

    let thisRowRatio: number

    if (mouseXRelativeToParent < zoneWidth) {
      const negativeRatio = (zoneWidth - mouseXRelativeToParent) / zoneWidth
      thisRowRatio = negativeRatio
      emit('newValueFromMouseLayer', thisRow, -negativeRatio)
    } else if (mouseXRelativeToParent > 24 + zoneWidth) {
      const positiveRatio =
        (mouseXRelativeToParent - (24 + zoneWidth)) / zoneWidth
      thisRowRatio = positiveRatio
      emit('newValueFromMouseLayer', thisRow, positiveRatio)
    } else {
      thisRowRatio = 0
      emit('newValueFromMouseLayer', thisRow, 0)
    }

    if (thisRow - prevRow > 1) {
      const numRowsSkipped = thisRow - prevRow
      for (let i = 1; i < numRowsSkipped; i++) {
        const diff = thisRowRatio - prevRowX
        const diffPerStep = diff / numRowsSkipped

        emit('newValueFromMouseLayer', prevRow + i, prevRowX + i * diffPerStep)
      }
    }

    if (prevRow - thisRow > 1) {
      const numRowsSkipped = prevRow - thisRow
      for (let i = 1; i < numRowsSkipped; i++) {
        const diff = thisRowRatio - prevRowX
        const diffPerStep = diff / numRowsSkipped

        console.log('skipped:' + (prevRow - i))
        emit('newValueFromMouseLayer', prevRow - i, prevRowX + i * diffPerStep)
      }
    }

    prevRowX = thisRowRatio

    prevRow = whichRow(mouseYRelativeToParent)
  }

  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

const handleMouseUp = () => {
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
