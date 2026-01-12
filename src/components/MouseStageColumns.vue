<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const handleMouseDown = () => {
  animationFrameId.value = requestAnimationFrame(captureMousePosition)
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

  console.log(thisColumn)

  if (thisColumn !== prevColumn) {
    const zoneHeight = (stageRef.value!.clientHeight - 24) / 2

    const topBoundary = zoneHeight
    const bottomBoundary = 24 + zoneHeight

    const thisColumnRatio =
      (Math.min(0, mouseYRelativeToStage - topBoundary) +
        Math.max(0, mouseYRelativeToStage - bottomBoundary)) /
      zoneHeight

    console.log(thisColumnRatio)

    emit('newValueFromMouseStage', thisColumn, thisColumnRatio)

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
            prevColumnRatio + i * diffPerStep,
          )
        }
      }
    }

    prevColumn = whichColumn(mouseXRelativeToStage)
    prevColumnRatio = thisColumnRatio
  }

  firstClick = false

  animationFrameId.value = requestAnimationFrame(captureMousePosition)
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div
    ref="stageRef"
    class="absolute z-10 h-full w-full bg-violet-400/30"
  ></div>
</template>
