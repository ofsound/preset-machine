<script setup lang="ts">
defineProps<{
  gainModuleModes: Array<{ label: string }>
  lastMenuButtonClickedLabel: string
}>()

defineEmits(['menuButtonClicked'])
</script>

<template>
  <div class="flex justify-center gap-3">
    <button
      v-for="(item, index) in gainModuleModes"
      :key="index"
      @click="$emit('menuButtonClicked', item)"
      class="cursor-pointer rounded-sm border bg-sky-50 px-3 py-px text-sm font-semibold tracking-wide"
      :class="{
        'bg-slate-300': lastMenuButtonClickedLabel === item.label,
      }"
    >
      {{ item.label }}
    </button>
  </div>
</template>
