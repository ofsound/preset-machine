<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'

const { corePreset } = usePreset()

corePreset.parameters['One Shot'] = 0

for (let i = 1; i <= 36; i++) {
  const numberString = String(i).padStart(2, '0')
  const gainKey = 'gain' + numberString
  corePreset.parameters[gainKey as keyof typeof corePreset.parameters] = -100
}

corePreset.parameters['gain01'] = 0

corePreset.offsets = new Array(511).fill(0)
corePreset.gains = new Array(511).fill(0)
corePreset.attacks = new Array(511).fill(0)
corePreset.decays = new Array(511).fill(0)
corePreset.sustains = new Array(511).fill(0)
corePreset.releases = new Array(511).fill(0)
</script>

<template>
  <div>Init Playground</div>
</template>
