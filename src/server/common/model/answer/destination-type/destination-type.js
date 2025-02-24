import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfigFactory, RadioOption} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'slaughter' | 'dedicated-sale' | 'afu' | 'other'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'
const isOriginAfu = (app) => app.origin?.originType === 'afu'

const tbRestrictedOption = { label: 'TB restricted farm' }
const afuOption = {
  label: 'Approved finishing unit (AFU)',
  hint: 'Including enhanced with grazing (AFUE)'
}

const onFarmOptions = (app) => {
  /** @type {Record<string, RadioOption>} */
  const options = isOriginAfu(app)
    ? {
        afu: afuOption
      }
    : {
        'tb-restricted-farm': tbRestrictedOption,
        afu: afuOption,
        zoo: { label: 'Zoo' },
        lab: { label: 'Laboratory' },
        other: { label: 'Another destination' }
      }
  return options
}

const offFarmOptions = {
  slaughter: { label: 'Slaughter' },
  'dedicated-sale': { label: 'Dedicated sale for TB (orange market)' },
  afu: afuOption,
  other: {
    label: 'Another destination',
    hint: 'For example, a veterinary practice, zoo, or a laboratory'
  }
}

/** @augments {RadioButtonAnswer<DestinationTypePayload>} */
export class DestinationTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfigFactory} */
  static config = (app) => ({
    payloadKey: 'destinationType',
    options: isOnToTheFarm(app) ? onFarmOptions(app) : offFarmOptions,
    errors: {
      emptyOptionText: 'Select where the animals are going'
    }
  })
}
