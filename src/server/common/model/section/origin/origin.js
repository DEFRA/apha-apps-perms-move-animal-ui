import { SectionModel } from '../section-model/section-model.js'
import { onOffFarmPage } from '../../../../origin/on-off-farm/index.js'
import { origin } from '~/src/server/origin/index.js'

/** @import {RawApplicationState} from '../../state/state-manager.js' */

/**
 * export @typedef {{
 * onOffFarm: OnOffFarmData | undefined;
 * cphNumber: CphNumberData | undefined;
 * address: AddressData | undefined;
 * }} OriginData
 * @import {OnOffFarmData} from '../../answer/on-off-farm/on-off-farm.js'
 * @import {CphNumberData} from '../../answer/cph-number/cph-number.js'
 * @import {AddressData} from '../../answer/address/address.js'
 */

export class OriginSection extends SectionModel {
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin: origin,
    summaryLink: '/origin/check-answers',
    isEnabled: () => true,
    isVisible: true
  }

  static firstPageFactory = () => onOffFarmPage

  /**
   * @param {OriginData | undefined} data
   * @param {RawApplicationState} context
   */
  static fromState(data, context) {
    return super.fromState(data, context)
  }
}
