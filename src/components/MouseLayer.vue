<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  rowPixelHeight: string
  numRows: number
}>()

const emit = defineEmits(['newValueFromMouseLayer'])

const mouseLayerRef = ref<HTMLElement | null>(null)

const animationFrameId = ref(0)

let mouseX: number
let mouseY: number

let prevRow: number
let prevRowRatio: number

const handleMouseDown = () => {
  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

const whichRow = (yValue: number) => {
  let biggestBin = 0

  for (let i = 0; i < props.numRows; i++) {
    if (yValue > Number(props.rowPixelHeight) * i) {
      biggestBin = i
    }
  }
  return biggestBin
}

function captureMousePosition() {
  const stageBottom = mouseLayerRef.value!.getBoundingClientRect().bottom
  const stageLeft = mouseLayerRef.value!.getBoundingClientRect().left

  const mouseXRelativeToStage = mouseX - stageLeft
  const mouseYRelativeToStage = stageBottom - mouseY

  const thisRow = whichRow(mouseYRelativeToStage)

  if (thisRow !== prevRow) {
    const zoneWidth = (mouseLayerRef.value!.clientWidth - 24) / 2

    const leftBoundary = zoneWidth
    const rightBoundary = 24 + zoneWidth

    const thisRowRatio =
      (Math.min(0, mouseXRelativeToStage - leftBoundary) +
        Math.max(0, mouseXRelativeToStage - rightBoundary)) /
      zoneWidth

    emit('newValueFromMouseLayer', thisRow, thisRowRatio)

    const rowDiff = thisRow - prevRow
    const numRowsSkipped = Math.abs(rowDiff)

    if (numRowsSkipped > 1) {
      const diffPerStep = (thisRowRatio - prevRowRatio) / numRowsSkipped
      const direction = Math.sign(rowDiff)

      for (let i = 1; i < numRowsSkipped; i++) {
        emit(
          'newValueFromMouseLayer',
          prevRow + i * direction,
          prevRowRatio + i * diffPerStep,
        )
      }
    }

    prevRowRatio = thisRowRatio

    prevRow = whichRow(mouseYRelativeToStage)
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
