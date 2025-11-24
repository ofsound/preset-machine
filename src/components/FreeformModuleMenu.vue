<script setup lang="ts">
import type { EnvelopeLabelAndSegment } from '@/types'

defineProps<{
  envelopeSegments: EnvelopeLabelAndSegment[]
}>()

defineEmits(['menuButtonClicked'])
</script>

<template>
  <div class="flex justify-center gap-3">
    <button
      v-for="(item, index) in envelopeSegments"
      :key="index"
      @click="$emit('menuButtonClicked', item)"
      class="pointer-cursor rounded-sm border px-3"
    >
      {{ item.label }}
    </button>
  </div>
</template>
