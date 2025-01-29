import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/** @type {RadioButtonConfig} */
const keptSeparatelyConfig = {
  payloadKey: 'keptSeparately',
  options: {
    yes: { label: 'Yes' },
    no: { label: 'No' }
  },
  errors: {
    emptyOptionText: 'Select if the incoming cattle will be kept separately'
  },
  layout: 'inline'
}

/**
 * export @typedef {'yes'|'no'} KeptSeparatelyData
 * @typedef {{ keptSeparately: KeptSeparatelyData }} KeptSeparatelyPayload
 */

/** @augments {RadioButtonAnswer<KeptSeparatelyPayload>} */
export class KeptSeparatelyAnswer extends RadioButtonAnswer {
  get config() {
    return keptSeparatelyConfig
  }

  static get config() {
    return keptSeparatelyConfig
  }
}
