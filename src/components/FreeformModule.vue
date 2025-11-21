<script setup lang="ts">
import FreeformDraw from '@/components/FreeformDraw.vue'

import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template>
  <div class="flex">
    <FreeformDraw :segment="store.preset.offsets" />
    <FreeformDraw :segment="store.preset.attacks" />
    <FreeformDraw :segment="store.preset.decays" />
    <FreeformDraw :segment="store.preset.holds" />
    <FreeformDraw :segment="store.preset.releases" />
  </div>
</template>
