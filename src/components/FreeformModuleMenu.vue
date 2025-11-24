<script setup lang="ts">
import type { EnvelopeLabelAndSegment } from '@/types'

defineProps<{
  envelopeSegments: EnvelopeLabelAndSegment[]
  lastMenuButtonClickedLabel: string
}>()

defineEmits(['menuButtonClicked'])
</script>

<template>
  <div class="flex justify-center gap-3">
    <button
      v-for="(item, index) in envelopeSegments"
      :key="index"
      @click="$emit('menuButtonClicked', item)"
      class="pointer-cursor rounded-sm border px-3 py-px text-sm font-semibold tracking-wide"
      :class="{
        'bg-slate-300': lastMenuButtonClickedLabel === item.label,
      }"
    >
      {{ item.label }}
    </button>
  </div>
</template>
