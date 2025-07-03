import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig, RadioButtonConfigFactory} from '../radio-button/radio-button.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'afu' | 'other' | 'market' | 'unrestricted-farm' | 'zoo' | 'lab' | 'after-import-location' } OriginTypeData
 * @typedef {{ originType: OriginTypeData }} OriginTypePayload
 */

/**
 * @param {RawApplicationState} app
 * @returns boolean
 */
const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'

const tbRestrictedOption = { label: 'TB restricted farm' }
const afuOption = {
  label: 'Approved finishing unit (AFU)',
  hint: 'Including enhanced with grazing (AFUE)'
}

const otherOption = { label: 'Another TB restrictied origin' }

const offFarmOptions = {
  'tb-restricted-farm': tbRestrictedOption,
  afu: afuOption,
  'unrestricted-farm': {
    label: 'Unrestricted farm or premises'
  },
  'iso-unit': { label: 'TB isolation unit' },
  other: otherOption
}

const onFarmOptions = {
  'unrestricted-farm': {
    label: 'Unrestricted farms and markets'
  },
  'tb-restricted-farm': tbRestrictedOption,
  afu: afuOption,
  'after-import-location': {
    label: 'Location after animals have been imported'
  },
  other: otherOption
}

/** @augments {RadioButtonAnswer<OriginTypePayload>} */
export class OriginTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfigFactory} */
  static config = (app) => ({
    payloadKey: 'originType',
    options: isOnToTheFarm(app) ? onFarmOptions : offFarmOptions,
    validation: {
      empty: 'Select where the animals are moving from'
    }
  })

  /** @returns {boolean} */
  static isTbRestricted(type) {
    return ['tb-restricted-farm', 'zoo', 'other', 'lab'].includes(type ?? '')
  }
}
