import { CheckboxAnswer } from '../checkbox/checkbox.js'
/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/** @typedef {{ badgers: CheckboxData }} BadgersPayload */

/** @type {CheckboxConfig} */
const config = {
  payloadKey: 'badgers',
  hint: 'Only select the measures you are taking',
  options: {
    badgerProofFencing: {
      label:
        'Badger proof fencing, such as solid aluminium sheeted gates, aluminium sheeting on rail fences, retractable electric fences'
    },
    aluminiumFeedBins: {
      label: 'Aluminium feed bins'
    },
    limitAccessToBadgerHabitat: {
      label: 'Limiting access to badger latrines and setts'
    },
    troughsAbove90cm: {
      label: 'Feed and water troughs above 90cm'
    },
    licksOutOfReach: {
      label: 'Mineral licks kept out of reach'
    },
    other: {
      label: 'Other decontamination methods'
    }
  },
  validation: {}
}

export class BadgersAnswer extends CheckboxAnswer {
  static config = config
}
