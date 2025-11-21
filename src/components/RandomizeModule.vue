<script setup lang="ts">
import { useStore } from '@/stores/store'

import RandomizeEnv from '@/components/RandomizeEnv.vue'

const store = useStore()
</script>

<template>
  <div>
    <h1 class="mb-2">Randomize Envelopes</h1>
    <RandomizeEnv :segment="store.preset.offsets" />
    <RandomizeEnv :segment="store.preset.attacks" />
    <RandomizeEnv :segment="store.preset.decays" />
    <RandomizeEnv :segment="store.preset.holds" />
    <RandomizeEnv :segment="store.preset.releases" />
  </div>
</template>

<!-- Maybe that should be an array here rather than listing out RandomizeEnv -->
