<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'

const { preset } = usePreset()

preset.parameters['One Shot'] = 0

for (let i = 1; i <= 36; i++) {
  const numberString = String(i).padStart(2, '0')
  const gainKey = 'gain' + numberString
  preset.parameters[gainKey as keyof typeof preset.parameters] = -100
}

preset.parameters['gain01'] = 0

preset.offsets = new Array(511).fill(0)
preset.gains = new Array(511).fill(0)
preset.attacks = new Array(511).fill(0)
preset.decays = new Array(511).fill(0)
preset.sustains = new Array(511).fill(0)
preset.releases = new Array(511).fill(0)
</script>

<template>
  <div>Init Playground</div>
</template>
