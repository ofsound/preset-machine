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

let prevColumn: number
let prevColumnRatio: number

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
    event.preventDefault()
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

const whichColumn = (mouseXRelativeToStage: number): number => {
  return Math.floor(
    mouseXRelativeToStage / (stageRef.value!.clientWidth / props.numHarmonics),
  )
}

function captureMousePosition() {
  const stageBottom = stageRef.value!.getBoundingClientRect().bottom
  const stageLeft = stageRef.value!.getBoundingClientRect().left

  const mouseXRelativeToStage = mouseX - stageLeft
  const mouseYRelativeToStage = stageBottom - mouseY

  const thisColumn = whichColumn(mouseXRelativeToStage)

  const zoneHeight = (stageRef.value!.clientHeight - 24) / 2

  const topBoundary = zoneHeight
  const bottomBoundary = 24 + zoneHeight

  const thisColumnRatio =
    (Math.min(0, mouseYRelativeToStage - topBoundary) +
      Math.max(0, mouseYRelativeToStage - bottomBoundary)) /
    zoneHeight

  if (thisColumn !== prevColumn) {
    if (!firstClick) {
      const columnDiff = thisColumn - prevColumn
      const numColumnsSkipped = Math.abs(columnDiff)

      if (numColumnsSkipped > 1) {
        const diffPerStep =
          (thisColumnRatio - prevColumnRatio) / numColumnsSkipped
        const direction = Math.sign(columnDiff)

        for (let i = 1; i < numColumnsSkipped; i++) {
          emit(
            'newValueFromMouseStage',
            prevColumn + i * direction,
            Math.max(Math.min(prevColumnRatio + i * diffPerStep, 1), -1),
          )
        }
      }
    }

    prevColumn = whichColumn(mouseXRelativeToStage)
    prevColumnRatio = thisColumnRatio
  }

  emit(
    'newValueFromMouseStage',
    thisColumn,
    Math.max(Math.min(thisColumnRatio, 1), -1),
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
  <div ref="stageRef" class="absolute z-10 h-full w-full select-none"></div>
</template>
