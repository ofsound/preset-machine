<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  numHarmonics: number
}>()

const emit = defineEmits(['newValueFromMouseStage'])

const stageRef = ref<HTMLElement | null>(null)

const animationFrameId = ref(0)

let firstClick = true

let mouseX: number
let mouseY: number

let prevRow: number
let prevRowRatio: number

function isClickWithinBoundingBox(
  event: MouseEvent,
  element: HTMLElement,
  padding: number = 20,
): boolean {
  const rect = element.getBoundingClientRect()

  const paddedLeft = rect.left - padding
  const paddedRight = rect.right + padding
  const paddedTop = rect.top - padding
  const paddedBottom = rect.bottom + padding

  if (
    event.clientX >= paddedLeft &&
    event.clientX <= paddedRight &&
    event.clientY >= paddedTop &&
    event.clientY <= paddedBottom
  ) {
    return true
  } else {
    return false
  }
}

const handleMouseDown = (event: MouseEvent) => {
  if (isClickWithinBoundingBox(event, stageRef.value!)) {
    animationFrameId.value = requestAnimationFrame(captureMousePosition)
  }
}

const handleMouseUp = () => {
  cancelAnimationFrame(animationFrameId.value)
  firstClick = true
}

const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX
  mouseY = event.clientY
}

const whichRow = (mouseYRelativeToStage: number): number => {
  return Math.floor(
    mouseYRelativeToStage / (stageRef.value!.clientHeight / props.numHarmonics),
  )
}

function captureMousePosition() {
  const stageBottom = stageRef.value!.getBoundingClientRect().bottom
  const stageLeft = stageRef.value!.getBoundingClientRect().left

  const mouseXRelativeToStage = mouseX - stageLeft
  const mouseYRelativeToStage = stageBottom - mouseY

  const thisRow = whichRow(mouseYRelativeToStage)

  const zoneWidth = (stageRef.value!.clientWidth - 24) / 2

  const leftBoundary = zoneWidth
  const rightBoundary = 24 + zoneWidth

  const thisRowRatio =
    (Math.min(0, mouseXRelativeToStage - leftBoundary) +
      Math.max(0, mouseXRelativeToStage - rightBoundary)) /
    zoneWidth

  if (thisRow !== prevRow) {
    if (!firstClick) {
      const rowDiff = thisRow - prevRow
      const numRowsSkipped = Math.abs(rowDiff)

      if (numRowsSkipped > 1) {
        const diffPerStep = (thisRowRatio - prevRowRatio) / numRowsSkipped
        const direction = Math.sign(rowDiff)

        for (let i = 1; i < numRowsSkipped; i++) {
          emit(
            'newValueFromMouseStage',
            prevRow + i * direction,
            Math.max(Math.min(prevRowRatio + i * diffPerStep, 1), -1),
          )
        }
      }
    }

    prevRow = whichRow(mouseYRelativeToStage)
    prevRowRatio = thisRowRatio
  }

  emit(
    'newValueFromMouseStage',
    thisRow,
    Math.max(Math.min(thisRowRatio, 1), -1),
  )

  firstClick = false

  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div ref="stageRef" class="absolute z-10 h-full w-full"></div>
</template>
