<script setup lang="ts">
import type { EnvelopeLabelAndSegment } from '@/types.ts'

defineProps<{
  envelopeSegments: EnvelopeLabelAndSegment[]
  lastMenuButtonClickedLabel: string
}>()

defineEmits(['menuButtonClicked'])
</script>

<template>
  <div class="mt-6 flex justify-center gap-3">
    <button
      v-for="(item, index) in envelopeSegments"
      :key="index"
      @click="$emit('menuButtonClicked', item)"
      class="cursor-pointer rounded-t-sm bg-stone-100 px-4 py-1 text-[15px] font-semibold tracking-wide text-gray-500/70"
      :class="{
        'bg-linear-to-t from-zinc-200/60 to-neutral-200/80! text-black! text-shadow-neutral-400/20 text-shadow-xs':
          lastMenuButtonClickedLabel === item.label,
      }"
    >
      {{ item.label }}
    </button>
  </div>
</template>
