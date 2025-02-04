import { SectionModel } from '../section-model/section-model.js'
import { onOffFarmPage } from '../../../../origin/on-off-farm/index.js'

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
    title: 'Movement origin',
    summaryLink: '/origin/check-answers',
    isEnabled: () => true
  }

  static firstPageFactory = () => onOffFarmPage

  /**
   * @param {OriginData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }
}
