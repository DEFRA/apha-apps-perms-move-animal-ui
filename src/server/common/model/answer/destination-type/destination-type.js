import { config } from '~/src/config/config.js'
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
        other: { label: 'Another destination' }
      }

const offFarmOptionsR1 = {
  slaughter: { label: 'Slaughter' },
  'dedicated-sale': { label: 'Dedicated sale for TB (orange market)' },
  afu: afuOption,
  other: {
    label: 'Another destination',
    hint: 'For example, a veterinary practice, zoo, or a laboratory'
  }
}

/** @returns {Record<string, RadioOption>} */
const offFarmOptionsR2 = (app) =>
  isOriginAfu(app)
    ? {
        slaughter: { label: 'Slaughter' },
        afu: afuOption
      }
    : {
        'tb-restricted-farm': tbRestrictedOption,
        slaughter: { label: 'Slaughter' },
        'dedicated-sale': { label: 'Dedicated sale for TB (orange market)' },
        afu: afuOption,
        zoo: { label: 'Zoo with TB restrictions' },
        lab: { label: 'Laboratory' },
        other: {
          label: 'Another destination'
        }
      }

const offFarmOptions = (app) =>
  config.get('featureFlags').biosecurity
    ? offFarmOptionsR2(app)
    : offFarmOptionsR1

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
}
