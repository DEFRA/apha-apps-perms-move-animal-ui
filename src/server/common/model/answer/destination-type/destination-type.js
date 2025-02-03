import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/** @type {RadioButtonConfig} */
const onOffFarmConfig = {
  payloadKey: 'destinationType',
  options: {
    slaughter: { label: 'Slaughter' },
    'dedicated-sale': { label: 'Dedicated sale for TB (orange market)' },
    afu: {
      label: 'Approved finishing unit (AFU)',
      hint: 'Including enhanced with grazing (AFUE)'
    },
    other: {
      label: 'Another destination',
      hint: 'For example, a veterinary practice, zoo, or a laboratory'
    }
  },
  errors: {
    emptyOptionText: 'Select where the animals are going'
  }
}

/**
 * export @typedef {'slaughter' | 'dedicated-sale' | 'afu' | 'other'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

/** @augments {RadioButtonAnswer<DestinationTypePayload>} */
export class DestinationTypeAnswer extends RadioButtonAnswer {
  static config = onOffFarmConfig
}
