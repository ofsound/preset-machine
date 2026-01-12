<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  rowPixelHeight: string
  numRows: number
}>()

const emit = defineEmits(['newValueFromMouseLayer'])

const stageRef = ref<HTMLElement | null>(null)

const animationFrameId = ref(0)

let mouseX: number
let mouseY: number

let prevRow: number
let prevRowRatio: number

const handleMouseDown = () => {
  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

const handleMouseUp = () => {
  cancelAnimationFrame(animationFrameId.value)
}

const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX
  mouseY = event.clientY
}

const whichRow = (mouseYRelativeToStage: number): number => {
  return Math.floor(mouseYRelativeToStage / Number(props.rowPixelHeight))
}

function captureMousePosition() {
  const stageBottom = stageRef.value!.getBoundingClientRect().bottom
  const stageLeft = stageRef.value!.getBoundingClientRect().left

  const mouseXRelativeToStage = mouseX - stageLeft
  const mouseYRelativeToStage = stageBottom - mouseY

  const thisRow = whichRow(mouseYRelativeToStage)

  if (thisRow !== prevRow) {
    const zoneWidth = (stageRef.value!.clientWidth - 24) / 2

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

    prevRow = whichRow(mouseYRelativeToStage)
    prevRowRatio = thisRowRatio
  }

  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div ref="stageRef" class="absolute z-10 h-full w-full"></div>
</template>
