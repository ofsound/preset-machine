<script setup lang="ts">
import { usePreset } from '@/composables/usePreset'
const { preset } = usePreset()
</script>

<template>
  <div class="hidden">{{ preset }}</div>
</template>
