<script setup lang="ts">
// import type { SineMachinePreset } from './types/SineMachinePreset.ts'

import { useState } from '@/composables/useState'
const { preset } = useState()
</script>

<template>
  <div class="hidden">{{ preset }}</div>
</template>
