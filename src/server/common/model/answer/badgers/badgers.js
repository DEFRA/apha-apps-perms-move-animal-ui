import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */

/**
 * @typedef {{ badgers: CheckboxData }} BadgersPayload
 */

/**
 * @augments {CheckboxAnswer<BadgersPayload>}
 */
export class BadgersAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'badgers',
    isPageHeading: true,
    hint: 'Only select the measures you are taking. You do not need to select them all to receive your licence.',
    options: {
      badgerProofFencing: {
        label:
          'Badger-proof fencing, such as wired fences, solid aluminium sheeted gates and rail fences or retractable electric fences'
      },
      aluminiumFeedBins: {
        label: 'Aluminium feed bins'
      },
      limitAccessToBadgerHabitat: {
        label: 'Limiting access to badger latrines and setts'
      },
      troughsAbove90cm: {
        label: 'Feed and water troughs raised above 90cm'
      },
      securedFeedStores: {
        label: 'Feed stores are secured'
      },
      licksOutOfReach: {
        label: 'Mineral licks kept out of reach of wildlife'
      },
      other: {
        label: 'Other measures to reduce the risk of infection'
      }
    },
    errors: {}
  }
}
