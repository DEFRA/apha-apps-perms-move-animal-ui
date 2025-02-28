import { config } from '~/src/config/config.js'
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

const zooOption = {
  label: 'Zoo with TB restrictions'
}

const offFarmOptions = () =>
  config.get('featureFlags').biosecurity
    ? offFarmOptionsBiosecurityTrue
    : offFarmOptionsBiosecurityFalse

const offFarmOptionsBiosecurityFalse = {
  'tb-restricted-farm': tbRestrictedOption,
  afu: afuOption,
  other: { label: 'Another type of premises' }
}

const offFarmOptionsBiosecurityTrue = {
  'tb-restricted-farm': tbRestrictedOption,
  afu: afuOption,
  'unrestricted-farm': {
    label: 'Unrestricted farm or premises'
  },
  zoo: zooOption,
  lab: { label: 'Laboratory' },
  other: { label: 'Another origin' }
}

const onFarmOptions = {
  market: { label: 'Market' },
  'unrestricted-farm': {
    label: 'Unrestricted farm or premises'
  },
  'tb-restricted-farm': tbRestrictedOption,
  afu: afuOption,
  zoo: zooOption,
  lab: { label: 'Laboratory' },
  'after-import-location': {
    label: 'Location after animals have been imported'
  },
  other: { label: 'Another origin' }
}

/** @augments {RadioButtonAnswer<OriginTypePayload>} */
export class OriginTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfigFactory} */
  static config = (app) => ({
    payloadKey: 'originType',
    options: isOnToTheFarm(app) ? onFarmOptions : offFarmOptions(),
    errors: {
      emptyOptionText: 'Select where the animals are moving from'
    }
  })
}
