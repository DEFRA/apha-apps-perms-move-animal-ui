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
    hintI18nKey: 'tb.biosecurity.badgers.hint',
    options: {
      badgerProofFencing: {
        label:
          'Badger-proof fencing, such as wired fences, solid aluminium sheeted gates and rail fences or retractable electric fences',
        labelI18nKey: 'tb.biosecurity.badgers.options.badgerProofFencing.label'
      },
      aluminiumFeedBins: {
        label: 'Aluminium feed bins',
        labelI18nKey: 'tb.biosecurity.badgers.options.aluminiumFeedBins.label'
      },
      limitAccessToBadgerHabitat: {
        label: 'Limiting access to badger latrines and setts',
        labelI18nKey:
          'tb.biosecurity.badgers.options.limitAccessToBadgerHabitat.label'
      },
      troughsAbove90cm: {
        label: 'Feed and water troughs raised above 90cm',
        labelI18nKey: 'tb.biosecurity.badgers.options.troughsAbove90cm.label'
      },
      securedFeedStores: {
        label: 'Feed stores are secured',
        labelI18nKey: 'tb.biosecurity.badgers.options.securedFeedStores.label'
      },
      licksOutOfReach: {
        label: 'Mineral licks kept out of reach of wildlife',
        labelI18nKey: 'tb.biosecurity.badgers.options.licksOutOfReach.label'
      },
      other: {
        label: 'Other measures to reduce the risk of infection',
        labelI18nKey: 'tb.biosecurity.badgers.options.other.label'
      }
    },
    validation: {}
  }
}
