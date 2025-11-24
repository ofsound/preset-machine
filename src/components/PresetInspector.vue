<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

const dataLink = ref('')
const dataLinkOriginal = ref('')

const handleClick = (event: MouseEvent) => {
  dataLinkOriginal.value = (event.target as HTMLElement).innerText
  dataLink.value = (event.target as HTMLElement).innerText.replace(
    /\s+\(.*$/,
    '',
  )
}

const buttonObjects = ref([
  'Meta',
  `Gains (${preset.gains.length})`,
  `Offsets (${preset.offsets.length})`,
  `Attacks (${preset.attacks.length})`,
  `Decays (${preset.decays.length})`,
  `Sustains (${preset.sustains.length})`,
  `Holds (${preset.holds.length})`,
  `Releases (${preset.releases.length})`,
  'Parameters',
  `pitchMapping (${preset.pitchMapping.length})`,
  `glideTimesInBlocks (${preset.glideTimesInBlocks.length})`,
  `filterTable (${preset.filterTable.length})`,
  `tremDepths (${preset.tremDepths.length})`,
  `tremRatesSeconds (${preset.tremRatesSeconds.length})`,
  `tremRatesBeats (${preset.tremRatesBeats.length})`,
  `tremOffsets (${preset.tremOffsets.length})`,
  `tremWavetable (${preset.tremWavetable.length})`,
  `pitchDepths (${preset.pitchDepths.length})`,
  `pitchRatesSeconds (${preset.pitchRatesSeconds.length})`,
  `pitchRatesBeats (${preset.pitchRatesBeats.length})`,
  `pitchNoiseAmounts (${preset.pitchNoiseAmounts.length})`,
])

watch(preset, () => {
  buttonObjects.value = [
    'Meta',
    `Gains (${preset.gains.length})`,
    `Offsets (${preset.offsets.length})`,
    `Attacks (${preset.attacks.length})`,
    `Decays (${preset.decays.length})`,
    `Sustains (${preset.sustains.length})`,
    `Holds (${preset.holds.length})`,
    `Releases (${preset.releases.length})`,
    'Parameters',
    `pitchMapping (${preset.pitchMapping.length})`,
    `glideTimesInBlocks (${preset.glideTimesInBlocks.length})`,
    `filterTable (${preset.filterTable.length})`,
    `tremDepths (${preset.tremDepths.length})`,
    `tremRatesSeconds (${preset.tremRatesSeconds.length})`,
    `tremRatesBeats (${preset.tremRatesBeats.length})`,
    `tremOffsets (${preset.tremOffsets.length})`,
    `tremWavetable (${preset.tremWavetable.length})`,
    `pitchDepths (${preset.pitchDepths.length})`,
    `pitchRatesSeconds (${preset.pitchRatesSeconds.length})`,
    `pitchRatesBeats (${preset.pitchRatesBeats.length})`,
    `pitchNoiseAmounts (${preset.pitchNoiseAmounts.length})`,
  ]
})
</script>

<template>
  <div class="mx-4 my-8 flex gap-4">
    <div class="h-max min-w-54 bg-slate-100 p-2">
      <div class="mb-3 px-1 font-semibold">Preset Inspector</div>
      <div class="flex flex-col items-start">
        <button
          v-for="item in buttonObjects"
          :key="item"
          @click="handleClick($event)"
          :class="{
            'bg-slate-300': item === dataLinkOriginal,
            'mb-2': item === 'Meta',
            'mt-2 mb-2': item === 'Parameters',
          }"
          class="cursor-pointer px-1 hover:underline"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div>
      <div v-if="dataLink === 'Meta'">
        <div>{{ preset.name }}</div>
        <div>{{ preset.author }}</div>
        <div>{{ preset.description }}</div>
        <div>{{ preset.uuid }}</div>
        <div>{{ preset.derivedFrom }}</div>
        <div>{{ preset.version }}</div>
      </div>

      <div v-if="dataLink === 'Gains'">{{ preset.gains }}</div>
      <div v-if="dataLink === 'Offsets'">{{ preset.offsets }}</div>
      <div v-if="dataLink === 'Attacks'">{{ preset.attacks }}</div>
      <div v-if="dataLink === 'Decays'">{{ preset.decays }}</div>
      <div v-if="dataLink === 'Sustains'">{{ preset.sustains }}</div>
      <div v-if="dataLink === 'Holds'">{{ preset.holds }}</div>
      <div v-if="dataLink === 'Releases'">{{ preset.releases }}</div>

      <div v-if="dataLink === 'Parameters'">
        <pre class="text-xs">{{ preset.parameters }}</pre>
      </div>

      <div v-if="dataLink === 'pitchMapping'">
        {{ preset.pitchMapping.join(', ') }}
      </div>
      <div v-if="dataLink === 'glideTimesInBlocks'">
        {{ preset.glideTimesInBlocks }}
      </div>
      <div v-if="dataLink === 'filterTable'">{{ preset.filterTable }}</div>
      <div v-if="dataLink === 'tremDepths'">{{ preset.tremDepths }}</div>
      <div v-if="dataLink === 'tremRatesSeconds'">
        {{ preset.tremRatesSeconds }}
      </div>
      <div v-if="dataLink === 'tremRatesBeats'">
        {{ preset.tremRatesBeats }}
      </div>
      <div v-if="dataLink === 'tremOffsets'">{{ preset.tremOffsets }}</div>
      <div v-if="dataLink === 'tremWavetable'">{{ preset.tremWavetable }}</div>
      <div v-if="dataLink === 'pitchDepths'">{{ preset.pitchDepths }}</div>
      <div v-if="dataLink === 'pitchRatesSeconds'">
        {{ preset.pitchRatesSeconds }}
      </div>
      <div v-if="dataLink === 'pitchRatesBeats'">
        {{ preset.pitchRatesBeats }}
      </div>
      <div v-if="dataLink === 'pitchNoiseAmounts'">
        {{ preset.pitchNoiseAmounts }}
      </div>
      <div v-if="dataLink === 'verbMix'">{{ preset.verbMix }}</div>
    </div>
  </div>
</template>
