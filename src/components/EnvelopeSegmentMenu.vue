<script setup lang="ts">
import type { EnvelopeLabelAndSegment } from '@/types.ts'

defineProps<{
  envelopeSegments: EnvelopeLabelAndSegment[]
  lastMenuButtonClickedLabel: string
}>()

defineEmits(['menuButtonClicked'])
</script>

<template>
  <div class="mt-4 flex justify-center gap-2">
    <button
      v-for="(item, index) in envelopeSegments"
      :key="index"
      @click="$emit('menuButtonClicked', item)"
      class="cursor-pointer rounded-t-sm bg-sky-50 px-3 py-px text-sm font-semibold tracking-wide"
      :class="{
        'bg-slate-200': lastMenuButtonClickedLabel === item.label,
      }"
    >
      {{ item.label }}
    </button>
  </div>
</template>
