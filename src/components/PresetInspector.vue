<script setup lang="ts">
import { ref, computed } from 'vue'

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

// A reusable factory function that takes a key name (e.g., 'gains', 'offsets')
// and the 'preset' object, and returns a computed property.
const createComputed = (key, preset) =>
  computed({
    get() {
      return preset[key].join(',')
    },
    set(newValue) {
      preset[key] = newValue
        .split(',')
        .map((item) => item.trim())
        .filter((item) => !isNaN(Number(item)) && item !== '')
    },
  })

const gains = createComputed('gains', preset)
const offsets = createComputed('offsets', preset)
const attacks = createComputed('attacks', preset)
const decays = createComputed('decays', preset)
const sustains = createComputed('sustains', preset)
const holds = createComputed('holds', preset)
const releases = createComputed('releases', preset)

const pitchMapping = createComputed('pitchMapping', preset)
const glideTimesInBlocks = createComputed('glideTimesInBlocks', preset)
const filterTable = createComputed('filterTable', preset)
const tremDepths = createComputed('tremDepths', preset)
const tremRatesSeconds = createComputed('tremRatesSeconds', preset)
const tremRatesBeats = createComputed('tremRatesBeats', preset)
const tremOffsets = createComputed('tremOffsets', preset)
const tremWavetable = createComputed('tremWavetable', preset)
const pitchDepths = createComputed('pitchDepths', preset)
const pitchRatesSeconds = createComputed('pitchRatesSeconds', preset)
const pitchRatesBeats = createComputed('pitchRatesBeats', preset)
const pitchNoiseAmounts = createComputed('pitchNoiseAmounts', preset)
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
    <div class="flex-1">
      <div
        v-if="dataLink === 'Meta'"
        class="*:mb-2 *:flex *:w-full *:[&>input]:w-full *:[&>input]:bg-slate-100 *:[&>input]:p-2 *:[&>span]:inline-block *:[&>span]:w-34 *:[&>span]:pt-2"
      >
        <label for="name">
          <span>name:</span>
          <input id="name" name="name" type="text" v-model="preset.name" />
        </label>
        <label for="author">
          <span>author:</span>
          <input
            id="author"
            name="author"
            type="text"
            v-model="preset.author"
          />
        </label>
        <label for="description">
          <span>description:</span>
          <input
            id="description"
            name="description"
            type="text"
            v-model="preset.description"
          />
        </label>
        <label for="uuid">
          <span>uuid:</span>
          <input id="uuid" name="uuid" type="text" v-model="preset.uuid" />
        </label>
        <label for="derivedFrom">
          <span>derivedFrom:</span>
          <input
            id="derivedFrom"
            name="derivedFrom"
            type="text"
            v-model="preset.derivedFrom"
          />
        </label>
        <label for="version">
          <span>version:</span>
          <input
            id="version"
            name="version"
            type="text"
            v-model="preset.version"
          />
        </label>
      </div>

      <div v-if="dataLink === 'Gains'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="gains"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Offsets'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="offsets"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Attacks'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="attacks"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Decays'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="decays"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Sustains'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="sustains"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Holds'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="holds"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Releases'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="releases"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'Parameters'">
        <label
          v-for="(value, key) in preset.parameters"
          :key="key"
          :for="key"
          class="mb-2 flex"
        >
          <span class="w-64">{{ key }}:</span>
          <input
            :id="key"
            :name="key"
            type="text"
            v-model="preset.parameters[key]"
            class="w-full bg-slate-100 p-2"
          />
        </label>
        <pre class="text-xs">{{ preset.parameters }}</pre>
      </div>

      <div v-if="dataLink === 'pitchMapping'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="pitchMapping"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'glideTimesInBlocks'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="glideTimesInBlocks"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'filterTable'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="filterTable"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'tremDepths'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="tremDepths"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'tremRatesSeconds'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="tremRatesSeconds"
          rows="200"
        ></textarea>
      </div>

      <div v-if="dataLink === 'tremRatesBeats'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="tremRatesBeats"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'tremOffsets'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="tremOffsets"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'tremWavetable'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="tremWavetable"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'pitchDepths'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="pitchDepths"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'pitchRatesSeconds'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="pitchRatesSeconds"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'pitchRatesBeats'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="pitchRatesBeats"
          rows="200"
        ></textarea>
      </div>
      <div v-if="dataLink === 'pitchNoiseAmounts'">
        <textarea
          class="w-full bg-slate-100 p-2"
          v-model="pitchNoiseAmounts"
          rows="200"
        ></textarea>
      </div>
    </div>
  </div>
</template>
