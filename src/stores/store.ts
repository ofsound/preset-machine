
import { v4 as uuidv4 } from 'uuid'
import type { ModuleIdentifier } from '@/types.ts'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {

  const modules = ref<ModuleIdentifier[]>([])

  const visibleComponentID = ref<string>('')

  const preset = ref({
    uuid: uuidv4(),
    name: 'New Preset',
    author: 'BJM',
    description: '',
    version: '',
    gains: new Array(512).fill(1),
    offsets: new Array(512).fill(0),
    attacks: new Array(512).fill(.006),
    decays: new Array(512).fill(0),
    sustains: new Array(512).fill(0),
    holds: new Array(512).fill(0),
    releases: new Array(512).fill(0),
    "parameters": {
      "Sustain": -64.0,
      "Release": 0,
      "Decay": 0,
      "Attack": 0,
      "Offset": 0,
      "Hold": 0,
      "gain01": 0.0,
      "gain02": -6.020600318908691,
      "gain03": -9.542426109313965,
      "gain04": -12.041200637817383,
      "gain05": -13.979400634765625,
      "gain06": -15.563024520874023,
      "gain07": -16.901960372924805,
      "gain08": -18.061800003051758,
      "gain09": -19.084850311279297,
      "gain10": -20.0,
      "gain11": -20.82785415649414,
      "gain12": -21.5836238861084,
      "gain13": -22.278865814208984,
      "gain14": -22.922561645507813,
      "gain15": -23.52182388305664,
      "gain16": -24.082401275634766,
      "gain17": -24.608978271484375,
      "gain18": -25.105449676513672,
      "gain19": -25.5750732421875,
      "gain20": -26.020601272583008,
      "gain21": -26.444385528564453,
      "gain22": -26.848453521728516,
      "gain23": -27.234556198120117,
      "gain24": -27.604225158691406,
      "gain25": -27.95880126953125,
      "gain26": -28.299467086791992,
      "gain27": -28.627273559570313,
      "gain28": -28.943159103393555,
      "gain29": -29.247961044311523,
      "gain30": -29.54242515563965,
      "gain31": -29.827234268188477,
      "gain32": -30.102998733520508,
      "gain33": -30.370277404785156,
      "gain34": -30.62957763671875,
      "gain35": -30.881364822387695,
      "gain36": -31.12605094909668,
    }
  })


  return { modules, visibleComponentID, preset }
})
