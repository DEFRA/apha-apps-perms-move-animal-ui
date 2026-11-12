import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig, RadioButtonConfigFactory} from '../radio-button/radio-button.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'afu' | 'other' | 'market' | 'unrestricted-farm' } OriginTypeData
 * @typedef {{ originType: OriginTypeData }} OriginTypePayload
 */

/**
 * @param {RawApplicationState} app
 * @returns boolean
 */
const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'

const keyPrefix = 'tb.origin.originType.options'

/**
 * @param {'offFarm' | 'onFarm'} group
 * @param {string} option
 * @param {string} label
 * @param {string} [hint]
 */
const option = (group, option, label, hint) => ({
  label,
  labelI18nKey: `${keyPrefix}.${group}.${option}.label`,
  ...(hint && { hint, hintI18nKey: `${keyPrefix}.${group}.${option}.hint` })
})

const offFarmOptions = {
  'tb-restricted-farm': option(
    'offFarm',
    'tb-restricted-farm',
    'TB restricted farm'
  ),
  afu: option(
    'offFarm',
    'afu',
    'Approved finishing unit (AFU)',
    'Including enhanced with grazing (AFUE)'
  ),
  'unrestricted-farm': option(
    'offFarm',
    'unrestricted-farm',
    'Unrestricted farm or premises'
  ),
  'iso-unit': option('offFarm', 'iso-unit', 'TB isolation unit'),
  other: option('offFarm', 'other', 'Another TB restricted origin')
}

const onFarmOptions = {
  'unrestricted-farm': option(
    'onFarm',
    'unrestricted-farm',
    'Unrestricted farms and markets'
  ),
  'tb-restricted-farm': option(
    'onFarm',
    'tb-restricted-farm',
    'TB restricted farm'
  ),
  afu: option(
    'onFarm',
    'afu',
    'Approved finishing unit (AFU)',
    'Including enhanced with grazing (AFUE)'
  ),
  other: option('onFarm', 'other', 'Another TB restricted origin')
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
    return ['tb-restricted-farm', 'other'].includes(type ?? '')
  }
}
