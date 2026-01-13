<script setup lang="ts">
import { ref, computed } from 'vue'

import { usePreset } from '@/composable/usePreset.ts'

import jsonSchema from '@/assets/schema.json' // Use @/ for the src directory alias

console.log(jsonSchema.parameters)

import type { Preset } from '@/types.ts'

const { corePreset } = usePreset()

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
  `Gains (${corePreset.gains.length})`,
  `Offsets (${corePreset.offsets.length})`,
  `Attacks (${corePreset.attacks.length})`,
  `Decays (${corePreset.decays.length})`,
  `Sustains (${corePreset.sustains.length})`,
  `Holds (${corePreset.holds.length})`,
  `Releases (${corePreset.releases.length})`,
  'Parameters',
  `pitchMapping (${corePreset.pitchMapping.length})`,
  `glideTimesInBlocks (${corePreset.glideTimesInBlocks.length})`,
  `filterTable (${corePreset.filterTable.length})`,
  `tremDepths (${corePreset.tremDepths.length})`,
  `tremRatesSeconds (${corePreset.tremRatesSeconds.length})`,
  `tremRatesBeats (${corePreset.tremRatesBeats.length})`,
  `tremOffsets (${corePreset.tremOffsets.length})`,
  `tremWavetable (${corePreset.tremWavetable.length})`,
  `pitchDepths (${corePreset.pitchDepths.length})`,
  `pitchRatesSeconds (${corePreset.pitchRatesSeconds.length})`,
  `pitchRatesBeats (${corePreset.pitchRatesBeats.length})`,
  `pitchNoiseAmounts (${corePreset.pitchNoiseAmounts.length})`,
])

const createComputed = (key: string, corePreset: Preset) =>
  computed({
    get() {
      return (corePreset[key as keyof typeof corePreset] as number[]).join(',')
    },
    set(newValue) {
      corePreset[key as keyof typeof corePreset] = newValue
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => !isNaN(Number(item)) && item !== '')
        .map(Number)
    },
  })

const gains = createComputed('gains', corePreset)
const offsets = createComputed('offsets', corePreset)
const attacks = createComputed('attacks', corePreset)
const decays = createComputed('decays', corePreset)
const sustains = createComputed('sustains', corePreset)
const holds = createComputed('holds', corePreset)
const releases = createComputed('releases', corePreset)

const pitchMapping = createComputed('pitchMapping', corePreset)
const glideTimesInBlocks = createComputed('glideTimesInBlocks', corePreset)
const filterTable = createComputed('filterTable', corePreset)
const tremDepths = createComputed('tremDepths', corePreset)
const tremRatesSeconds = createComputed('tremRatesSeconds', corePreset)
const tremRatesBeats = createComputed('tremRatesBeats', corePreset)
const tremOffsets = createComputed('tremOffsets', corePreset)
const tremWavetable = createComputed('tremWavetable', corePreset)
const pitchDepths = createComputed('pitchDepths', corePreset)
const pitchRatesSeconds = createComputed('pitchRatesSeconds', corePreset)
const pitchRatesBeats = createComputed('pitchRatesBeats', corePreset)
const pitchNoiseAmounts = createComputed('pitchNoiseAmounts', corePreset)
</script>

<template>
  <div class="mx-4 my-8 flex gap-4">
    <div class="h-max min-w-54 bg-slate-100 p-2">
      <div class="mb-3 px-1 text-lg font-semibold">Preset Inspector</div>
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
          <input id="name" name="name" type="text" v-model="corePreset.name" />
        </label>
        <label for="author">
          <span>author:</span>
          <input
            id="author"
            name="author"
            type="text"
            v-model="corePreset.author"
          />
        </label>
        <label for="description">
          <span>description:</span>
          <input
            id="description"
            name="description"
            type="text"
            v-model="corePreset.description"
          />
        </label>
        <label for="uuid">
          <span>uuid:</span>
          <input id="uuid" name="uuid" type="text" v-model="corePreset.uuid" />
        </label>
        <label for="derivedFrom">
          <span>derivedFrom:</span>
          <input
            id="derivedFrom"
            name="derivedFrom"
            type="text"
            v-model="corePreset.derivedFrom"
          />
        </label>
        <label for="version">
          <span>version:</span>
          <input
            id="version"
            name="version"
            type="text"
            v-model="corePreset.version"
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
          v-for="(value, key) in corePreset.parameters"
          :key="key"
          :for="key"
          class="mb-6 flex items-baseline"
        >
          <span class="w-64">{{ key }}:</span>
          <div class="w-full">
            <input
              :id="key"
              :name="key"
              type="text"
              v-model="corePreset.parameters[key]"
              class="w-full bg-slate-100 p-2"
            />
            <div class="mt-1 px-2 text-sm text-neutral-500 italic">
              <div v-if="jsonSchema.parameters && jsonSchema.parameters[key]">
                <div class="mb-.5 text-neutral-800">
                  {{ jsonSchema.parameters[key].description }}
                </div>
                <div class="flex hidden gap-2">
                  <div>type:</div>
                  <div>{{ jsonSchema.parameters[key].type }}</div>
                </div>
                <div
                  v-if="
                    (jsonSchema.parameters[key] as { minimum: unknown })
                      .minimum ||
                    (jsonSchema.parameters[key] as { maximum: unknown }).maximum
                  "
                  class="flex gap-2"
                >
                  <div class="w-13">range:</div>
                  <div>
                    {{
                      (jsonSchema.parameters[key] as { minimum: number })
                        .minimum
                    }}&nbsp;&nbsp;to&nbsp;
                    {{
                      (jsonSchema.parameters[key] as { maximum: number })
                        .maximum
                    }}
                  </div>
                </div>
                <div
                  v-if="
                    (jsonSchema.parameters[key] as { options: unknown }).options
                  "
                  class="flex gap-2"
                >
                  <div class="w-13">options:</div>
                  <div>
                    {{
                      (jsonSchema.parameters[key] as { options: unknown })
                        .options
                    }}
                  </div>
                </div>
                <div class="flex gap-2">
                  <div class="w-13">default:</div>
                  <div>{{ jsonSchema.parameters[key].default }}</div>
                </div>
              </div>
            </div>
          </div>
        </label>
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
