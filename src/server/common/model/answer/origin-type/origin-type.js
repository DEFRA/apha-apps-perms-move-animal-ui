import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/** @type {RadioButtonConfig} */
const config = {
  payloadKey: 'originType',
  options: {
    'tb-restricted-farm': { label: 'TB restricted farm' },
    afu: { label: 'Approved finishing unit (AFU)' },
    other: { label: 'Another type of premises' }
  },
  errors: {
    emptyOptionText: 'Select where the animals are moving from'
  }
}

/**
 * export @typedef {'tb-restricted-farm' | 'afu' | 'other'} OriginTypeData
 * @typedef {{ originType: OriginTypeData }} OriginTypePayload
 */

/** @augments {RadioButtonAnswer<OriginTypePayload>} */
export class OriginTypeAnswer extends RadioButtonAnswer {
  get config() {
    return config
  }

  static get config() {
    return config
  }
}
