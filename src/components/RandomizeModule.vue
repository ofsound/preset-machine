<script setup lang="ts">
import { useStore } from '@/stores/store'

import RandomizeEnv from '@/components/RandomizeEnv.vue'

const store = useStore()
</script>

<template>
  <div>
    <RandomizeEnv label="Offset" :segment="store.preset.offsets" />
    <RandomizeEnv label="Attack" :segment="store.preset.attacks" />
    <RandomizeEnv label="Decay" :segment="store.preset.decays" />
    <RandomizeEnv label="Hold" :segment="store.preset.holds" />
    <RandomizeEnv label="Release" :segment="store.preset.releases" />
  </div>
</template>

<!-- Maybe that should be an array here rather than listing out RandomizeEnv -->
