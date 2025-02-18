import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

/**
 * export @typedef {'tb-restricted-farm' | 'afu' | 'other'} OriginTypeData
 * @typedef {{ originType: OriginTypeData }} OriginTypePayload
 */

/**
 * @param {RawApplicationState} app
 * @returns boolean
 */
const isOnToTheFarm = (app) => app.origin?.onOffFarm === 'on'

/**
 * @param {RawApplicationState} app
 * @returns boolean
 */
const isNotOnToTheFarm = (app) => app.origin?.onOffFarm !== 'on'

/** @augments {RadioButtonAnswer<OriginTypePayload>} */
export class OriginTypeAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'originType',
    options: {
      market: { label: 'Market', predicate: isOnToTheFarm },
      'unrestricted-farm': {
        label: 'Unrestricted farm or premises',
        predicate: isOnToTheFarm
      },
      'tb-restricted-farm': { label: 'TB restricted farm' },
      afu: {
        label: 'Approved finishing unit (AFU)',
        hint: 'Including enhanced with grazing (AFUE)'
      },
      zoo: { label: 'Zoo', predicate: isOnToTheFarm },
      lab: { label: 'Laboratory', predicate: isOnToTheFarm },
      'after-import-location': {
        label: 'Location after animals have been imported',
        predicate: isOnToTheFarm
      },
      'another-origin': { label: 'Another origin', predicate: isOnToTheFarm },
      other: { label: 'Another type of premises', predicate: isNotOnToTheFarm }
    },
    errors: {
      emptyOptionText: 'Select where the animals are moving from'
    }
  }
}
