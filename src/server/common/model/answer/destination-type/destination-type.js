import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfigFactory, RadioOption} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'slaughter' | 'dedicated-sale' | 'afu' | 'zoo' | 'lab' | 'other'} DestinationTypeData
 * @typedef {{ destinationType: DestinationTypeData }} DestinationTypePayload
 */

const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'
const isOriginAfu = (app) => app.origin?.originType === 'afu'

const tbRestrictedOption = { label: 'TB restricted farm' }
const afuOption = {
  label: 'Approved finishing unit (AFU)',
  hint: 'Including enhanced with grazing (AFUE)'
}
const otherOption = { label: 'Another destination' }
const dedicatedSaleOption = { label: 'Dedicated sale for TB (orange market)' }
const slaughterOption = { label: 'Slaughter' }

/** @returns {Record<string, RadioOption>} */
const onFarmOptions = (app) =>
  isOriginAfu(app)
    ? {
        afu: afuOption
      }
    : {
        'tb-restricted-farm': tbRestrictedOption,
        afu: afuOption,
        zoo: { label: 'Zoo with TB restrictions' },
        lab: { label: 'Laboratory' },
        other: otherOption
      }

/** @returns {Record<string, RadioOption>} */
const offFarmOptions = (app) =>
  isOriginAfu(app)
    ? {
        slaughter: slaughterOption,
        afu: afuOption
      }
    : {
        'tb-restricted-farm': tbRestrictedOption,
        slaughter: slaughterOption,
        'dedicated-sale': dedicatedSaleOption,
        afu: afuOption,
        zoo: { label: 'Zoo with TB restrictions' },
        lab: { label: 'Laboratory' },
        other: otherOption
      }

/** @augments {RadioButtonAnswer<DestinationTypePayload>} */
export class DestinationTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfigFactory} */
  static config = (app) => ({
    payloadKey: 'destinationType',
    options: isOnToTheFarm(app) ? onFarmOptions(app) : offFarmOptions(app),
    errors: {
      emptyOptionText: 'Select where the animals are going'
    }
  })

  /** @returns {boolean} */
  static isTbRestricted(type) {
    return ['tb-restricted-farm', 'zoo'].includes(type ?? '')
  }
}
