<script setup lang="ts">
import FreeformDraw from '@/components/FreeformDraw.vue'

import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template>
  <div>
    <FreeformDraw label="Offset" :segment="store.preset.offsets" />
    <FreeformDraw label="Attack" :segment="store.preset.attacks" />
    <FreeformDraw label="Decay" :segment="store.preset.decays" />
    <FreeformDraw label="Holds" :segment="store.preset.holds" />
    <FreeformDraw label="Release" :segment="store.preset.releases" />
  </div>
</template>
