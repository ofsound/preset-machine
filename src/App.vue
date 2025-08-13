<script setup lang="ts">
import { ref, watch } from 'vue'

import AdjustmentSlider from './components/AdjustmentSlider.vue'
import JsonDrop from './components/JsonDrop.vue'
import JsonSave from './components/JsonSave.vue'

import { v4 as uuidv4 } from 'uuid'

import type { SineMachinePreset } from './types/SineMachinePreset.ts'

const handleJsonLoaded = (data: SineMachinePreset) => {
  jsonData.value = data
}

const handleRoundAmount = (roundAmountEmitted: number) => {
  roundAmount.value = roundAmountEmitted
}

const createUniqueBlankPreset = (): SineMachinePreset => {
  const newUuid = uuidv4()

  const sineMachinePreset: SineMachinePreset = {
    uuid: newUuid,
    name: 'New Preset',
    author: 'BJM',
    description: '',
    version: '',
    derivedFrom: 'Preset Machine',
    gains: [0],
    offsets: [0],
    attacks: [0],
    decays: [0],
    sustains: [0],
    holds: [0],
    releases: [0],
    glideTimesInBlocks: [0],
    filterTable: [0],
    tremDepths: [0],
    tremRatesSeconds: [0],
    tremRatesBeats: [0],
    tremOffsets: [0],
    tremWavetable: [0],
    pitchDepths: [0],
    pitchRatesSeconds: [0],
    pitchRatesBeats: [0],
    pitchNoiseAmounts: [0],
    parameters: {
      Attack: 0.10289467126131058,
      'Attack Affects': 0.0,
      'Attack Shape': 1.0,
      Decay: 1.088226079940796,
      'Decay Affects': 0.0,
      'Decay Shape': 1.0,
      Hold: 0.0,
      'Hold Affects': 0.0,
      'Hold Shape': 1.0,
      Offset: 0.0,
      'Offset Affects': 0.0,
      'Offset Shape': 1.0,
      'Pitch Amount Affects': 0.0,
      'Pitch Amount Curve': 0.5,
      'Pitch Amount Distribution': 0.3100000023841858,
      'Pitch LFO Shape': 0.0,
      'Pitch Randomness Amount': 0.011017648503184319,
      'Pitch Randomness Curve': 1.0,
      'Pitch Randomness Distribution': 0.0,
      'Pitch Rate Curve': 0.5,
      'Pitch Rate Distribution': 0.0,
      'Pitch Rate Hz': 0.5689659714698792,
      'Pitch Rate Note': 6.0,
      'Pitch Stiffness': 0.0015523906331509352,
      'Pitch Sync Type': 2.0,
      Release: 0.9765089154243469,
      'Release Affects': 0.0,
      'Release Shape': 1.0,
      'Retrigger Pitch LFOs': 1.0,
      Sustain: -57.791568756103516,
      'Sustain Affects': 1.0,
      'Sustain Shape': 3.0,
      'Trem Amount': 0.8018317222595215,
      'Trem Amount Curve': 0.35999998450279236,
      'Trem Amount Distribution': 0.0,
      'Trem Enable Attack': 1.0,
      'Trem Enable Decay': 1.0,
      'Trem Enable Hold': 1.0,
      'Trem Enable Release': 1.0,
      'Trem Enable Sustain': 1.0,
      'Trem Offset': 0.49865391850471497,
      'Trem Offset Freq': 7.0,
      'Trem Offset Shape': 1.0,
      'Trem Rate Curve': 0.23999999463558197,
      'Trem Rate Distribution': 0.0,
      'Trem Rate Hz': 2.6144111156463623,
      'Trem Rate Note': 7.0,
      'Trem Sharpness': 0.7867986559867859,
      'Trem Sync Type': 0.0,
      'Trem Type': 0.0,
      attack01: 0.0010387670481577516,
      attack02: 0.009291285648941994,
      attack03: 0.016917387023568153,
      attack04: 0.023964587599039078,
      attack05: 0.030476819723844528,
      attack06: 0.03649473190307617,
      attack07: 0.04205578938126564,
      attack08: 0.04719473049044609,
      attack09: 0.05194362998008728,
      attack10: 0.05633201077580452,
      attack11: 0.060387223958969116,
      attack12: 0.06413465738296509,
      attack13: 0.0675976350903511,
      attack14: 0.07079771906137466,
      attack15: 0.07375489920377731,
      attack16: 0.07648757100105286,
      attack17: 0.07901282608509064,
      attack18: 0.08134637773036957,
      attack19: 0.08350281417369843,
      attack20: 0.08549553900957108,
      attack21: 0.08733703941106796,
      attack22: 0.08903872966766357,
      attack23: 0.09061120450496674,
      attack24: 0.09206437319517136,
      attack25: 0.09340717643499374,
      attack26: 0.0946480855345726,
      attack27: 0.09579476714134216,
      attack28: 0.09685448557138443,
      attack29: 0.09783364832401276,
      attack30: 0.09873855859041214,
      attack31: 0.09957478195428848,
      attack32: 0.10034748911857605,
      attack33: 0.10106154531240463,
      attack34: 0.1017213985323906,
      attack35: 0.10233118385076523,
      attack36: 0.10289464890956879,
      decay01: 1.0882261991500854,
      decay02: 1.0051900148391724,
      decay03: 0.9280940294265747,
      decay04: 0.8565129041671753,
      decay05: 0.7900524139404297,
      decay06: 0.7283462285995483,
      decay07: 0.6710542440414429,
      decay08: 0.6178606152534485,
      decay09: 0.5684722661972046,
      decay10: 0.5226168036460876,
      decay11: 0.48004150390625,
      decay12: 0.4405119717121124,
      decay13: 0.4038101136684418,
      decay14: 0.3697338104248047,
      decay15: 0.33809518814086914,
      decay16: 0.30871984362602234,
      decay17: 0.28144583106040955,
      decay18: 0.25612279772758484,
      decay19: 0.23261122405529022,
      decay20: 0.21078163385391235,
      decay21: 0.19051358103752136,
      decay22: 0.1716955155134201,
      decay23: 0.1542234867811203,
      decay24: 0.13800130784511566,
      decay25: 0.12293960899114609,
      decay26: 0.10895539075136185,
      decay27: 0.0959715023636818,
      decay28: 0.08391642570495605,
      decay29: 0.07272370904684067,
      decay30: 0.062331657856702805,
      decay31: 0.052683025598526,
      decay32: 0.04372457414865494,
      decay33: 0.03540697693824768,
      decay34: 0.02768438309431076,
      decay35: 0.0205142330378294,
      decay36: 0.013856989331543446,
      gain01: -0.43354588747024536,
      gain02: -7.77891206741333,
      gain03: -11.961109161376953,
      gain04: -18.300369262695313,
      gain05: -19.7933292388916,
      gain06: -49.58250427246094,
      gain07: -33.80392074584961,
      gain08: -100.0,
      gain09: -38.169700622558594,
      gain10: -100.0,
      gain11: -41.65570831298828,
      gain12: -100.0,
      gain13: -44.557735443115234,
      gain14: -36.299869537353516,
      gain15: -40.080345153808594,
      gain16: -42.01048278808594,
      gain17: -49.21795654296875,
      gain18: -36.05963897705078,
      gain19: -38.71649169921875,
      gain20: -36.92106628417969,
      gain21: -38.68711853027344,
      gain22: -40.30013656616211,
      gain23: -39.23272705078125,
      gain24: -100.0,
      gain25: -41.183135986328125,
      gain26: -43.0130729675293,
      gain27: -42.883689880371094,
      gain28: -54.229827880859375,
      gain29: -45.74311828613281,
      gain30: -48.63758087158203,
      gain31: -44.93950653076172,
      gain32: -100.0,
      gain33: -47.51043701171875,
      gain34: -100.0,
      gain35: -58.13132858276367,
      gain36: -100.0,
      hold01: 0.0,
      hold02: 0.0,
      hold03: 0.0,
      hold04: 0.0,
      hold05: 0.0,
      hold06: 0.0,
      hold07: 0.0,
      hold08: 0.0,
      hold09: 0.0,
      hold10: 0.0,
      hold11: 0.0,
      hold12: 0.0,
      hold13: 0.0,
      hold14: 0.0,
      hold15: 0.0,
      hold16: 0.0,
      hold17: 0.0,
      hold18: 0.0,
      hold19: 0.0,
      hold20: 0.0,
      hold21: 0.0,
      hold22: 0.0,
      hold23: 0.0,
      hold24: 0.0,
      hold25: 0.0,
      hold26: 0.0,
      hold27: 0.0,
      hold28: 0.0,
      hold29: 0.0,
      hold30: 0.0,
      hold31: 0.0,
      hold32: 0.0,
      hold33: 0.0,
      hold34: 0.0,
      hold35: 0.0,
      hold36: 0.0,
      inverted01: 0.0,
      inverted02: 0.0,
      inverted03: 1.0,
      inverted04: 0.0,
      inverted05: 0.0,
      inverted06: 0.0,
      inverted07: 1.0,
      inverted08: 0.0,
      inverted09: 0.0,
      inverted10: 0.0,
      inverted11: 1.0,
      inverted12: 0.0,
      inverted13: 0.0,
      inverted14: 0.0,
      inverted15: 1.0,
      inverted16: 0.0,
      inverted17: 0.0,
      inverted18: 0.0,
      inverted19: 1.0,
      inverted20: 0.0,
      inverted21: 0.0,
      inverted22: 0.0,
      inverted23: 1.0,
      inverted24: 0.0,
      inverted25: 0.0,
      inverted26: 0.0,
      inverted27: 1.0,
      inverted28: 0.0,
      inverted29: 0.0,
      inverted30: 0.0,
      inverted31: 1.0,
      inverted32: 0.0,
      inverted33: 0.0,
      inverted34: 0.0,
      inverted35: 0.0,
      inverted36: 0.0,
      relativeMode: 0.0,
      release01: 0.9765090346336365,
      release02: 0.9011141061782837,
      release03: 0.8311767578125,
      release04: 0.7663018107414246,
      release05: 0.7061225771903992,
      release06: 0.6502991914749146,
      release07: 0.5985165238380432,
      release08: 0.5504818558692932,
      release09: 0.50592440366745,
      release10: 0.4645920991897583,
      release11: 0.4262513220310211,
      release12: 0.3906858265399933,
      release13: 0.35769468545913696,
      release14: 0.32709169387817383,
      release15: 0.2987035810947418,
      release16: 0.27237048745155334,
      release17: 0.24794335663318634,
      release18: 0.2252843827009201,
      release19: 0.2042655348777771,
      release20: 0.18476799130439758,
      release21: 0.16668178141117096,
      release22: 0.14990472793579102,
      release23: 0.1343420445919037,
      release24: 0.11990581452846527,
      release25: 0.10651450604200363,
      release26: 0.09409254789352417,
      release27: 0.0825696811079979,
      release28: 0.07188086956739426,
      release29: 0.06196575611829758,
      release30: 0.05276833847165108,
      release31: 0.04423665255308151,
      release32: 0.03632252290844917,
      release33: 0.028981225565075874,
      release34: 0.022171305492520332,
      release35: 0.015854332596063614,
      release36: 0.00999458134174347,
      sustain01: -63.996498107910156,
      sustain02: 0.0,
      sustain03: -63.94215393066406,
      sustain04: 0.0,
      sustain05: -63.78180694580078,
      sustain06: 0.0,
      sustain07: -63.30862045288086,
      sustain08: 0.0,
      sustain09: -61.91224670410156,
      sustain10: 0.0,
      sustain11: -57.79156494140625,
      sustain12: 0.0,
      sustain13: -59.91355895996094,
      sustain14: 0.0,
      sustain15: -61.31310272216797,
      sustain16: 0.0,
      sustain17: -62.236167907714844,
      sustain18: 0.0,
      sustain19: -62.84496307373047,
      sustain20: 0.0,
      sustain21: -63.246490478515625,
      sustain22: 0.0,
      sustain23: -63.51131820678711,
      sustain24: 0.0,
      sustain25: -63.68598175048828,
      sustain26: 0.0,
      sustain27: -63.801185607910156,
      sustain28: 0.0,
      sustain29: -63.877159118652344,
      sustain30: 0.0,
      sustain31: -63.927268981933594,
      sustain32: 0.0,
      sustain33: -63.96031951904297,
      sustain34: 0.0,
      sustain35: -63.982120513916016,
      sustain36: 0.0,
      triggerMode: 0.0,
      width: 0.0,
      'Attack Overshoot': 0.3000999987125397,
      'Decay and Release Undershoot': 9.999999747378752e-6,
      'Filter Cutoff': 6243.50634765625,
      'Pitch Amount': 0.038785237818956375,
      'Pitch Invert': 0.0,
      'Pitch Randomness Mode': 0.0,
      'Pitch Range': 1.0,
      Saturation: 0.0,
      'Trem Type Invert': 0.0,
      offset01: 0.0,
      offset02: 0.0,
      offset03: 0.0,
      offset04: 0.0,
      offset05: 0.0,
      offset06: 0.0,
      offset07: 0.0,
      offset08: 0.0,
      offset09: 0.0,
      offset10: 0.0,
      offset11: 0.0,
      offset12: 0.0,
      offset13: 0.0,
      offset14: 0.0,
      offset15: 0.0,
      offset16: 0.0,
      offset17: 0.0,
      offset18: 0.0,
      offset19: 0.0,
      offset20: 0.0,
      offset21: 0.0,
      offset22: 0.0,
      offset23: 0.0,
      offset24: 0.0,
      offset25: 0.0,
      offset26: 0.0,
      offset27: 0.0,
      offset28: 0.0,
      offset29: 0.0,
      offset30: 0.0,
      offset31: 0.0,
      offset32: 0.0,
      offset33: 0.0,
      offset34: 0.0,
      offset35: 0.0,
      offset36: 0.0,
      volume: 3.092031478881836,
      'Attack Curve': -4.0,
      'Decay Curve': 4.0,
      'Envelope Split': 10.0,
      'Envelope Timing': 128.0,
      'Filter Slope': 44.430973052978516,
      'Harmonic Slew Ms': 10.0,
      'Hold Curve': 4.0,
      'Max Harmonics': 511.0,
      'Max Voices': 20.0,
      'Offset Curve': -1.7881393432617188e-7,
      'Pitch Enable': 1.0,
      'Release Curve': 4.0,
      'Sustain Curve': 7.999999523162842,
      'Trem Enable': 1.0,
      'Unison Spread': 0.033368565142154694,
      'Unison Voices': 3.0,
      'Glide Time': 0.0,
      'Glide Time Curve': 0.5,
      'Glide Time Distribution': 0.5,
      'Global Tuning': 440.0,
      'Mono Mode': 0.0,
      'Pitch Bend Range': 2.0,
      'Pitch Noise Amount': 0.0389166995882988,
      'Pitch Noise Curve': 0.07999999821186066,
      'Pitch Noise Distribution': 1.0,
      'Pitch Noise Mode': 1.0,
      'Randomize Phase': 0.0,
      'Unison Stereo': 0.30000004172325134,
      'Velocity Sensitivity': 0.0,
    },
  }

  return sineMachinePreset
}

const jsonData = ref<SineMachinePreset>(createUniqueBlankPreset())

const harmonics = ref<number>(8)
const tempo = ref<number>(120)

const toolOptionValue = ref<number>(1)
const toolOptions = ref([
  { text: '1/16 & drag', value: 1 },
  { text: '1/8', value: 2 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
])

const activeOffsets = ref<number[]>(new Array(harmonics.value).fill(0))
const activeHolds = ref<number[]>(new Array(harmonics.value).fill(0))
const roundAmount = ref<number>(0)

watch(
  [activeOffsets, activeHolds],
  () => {
    if (jsonData.value) {
      const correctedOffsets = activeOffsets.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )
      const correctedHolds = activeHolds.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )
      jsonData.value.offsets.splice(0, harmonics.value, ...correctedOffsets)
      jsonData.value.holds.splice(0, harmonics.value, ...correctedHolds)
    }
  },
  { deep: true },
)
</script>

<template>
  <div>
    <div v-if="jsonData">
      <div class="mb-4 flex items-end justify-between">
        <h1 class="mb-0 py-4 text-center text-3xl font-bold">
          {{ jsonData.name }} : {{ jsonData.author }}
        </h1>
        <JsonSave :jsonData="jsonData" />
      </div>

      <div class="flex rounded-sm bg-gray-200 p-4">
        <div>
          Harmonics:
          <input class="max-w-14 rounded-sm bg-gray-300 p-1" type="number" v-model="harmonics" />
        </div>
        <div class="ml-4">
          Tempo: <input class="max-w-14 rounded-sm bg-gray-300 p-1" type="number" v-model="tempo" />
        </div>
        <div class="ml-auto">
          Hold Length:&nbsp;&nbsp;
          <select class="bg-gray-3 rounded-sm bg-gray-300 p-1 text-black" v-model="toolOptionValue">
            <option value="-1" disabled>Hold note value</option>
            <option
              v-for="toolOption in toolOptions"
              :key="toolOption.value"
              :value="toolOption.value"
            >
              {{ toolOption.text }}
            </option>
          </select>
        </div>
      </div>

      <div class="mx-auto mt-4 mb-10 flex flex-col-reverse">
        <AdjustmentSlider
          v-for="(n, i) in harmonics"
          :key="n"
          :value="toolOptionValue"
          v-model:offset="activeOffsets[i]"
          v-model:hold="activeHolds[i]"
          @roundAmount="handleRoundAmount"
        />
      </div>
    </div>

    <template v-else>
      <JsonDrop @jsonLoaded="handleJsonLoaded" />
    </template>
    <footer class="mt-auto flex justify-between pt-3 pb-3 text-right text-xs">
      <div class="italic">click (and drag) on row to choose an offset and hold length</div>
      <div>preset machine v.01</div>
    </footer>
  </div>
</template>

<style scoped></style>
