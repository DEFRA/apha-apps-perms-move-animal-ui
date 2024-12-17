import { SectionModel } from '../section-model/index.js'
import { onOffFarmPage } from '../../../../origin/on-off-farm/index.js'
import { cphNumberPage } from '../../../../origin/cph-number/index.js'
import { originAddressPage } from '../../../../origin/address/index.js'

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
  firstPage = onOffFarmPage

  get onOffFarm() {
    return this._data?.onOffFarm.answer
  }

  get cphNumber() {
    return this._data?.cphNumber.answer
  }

  get address() {
    return this._data?.address.answer
  }

  /**
   * @param {OriginData | undefined} state
   * @returns {OriginSection}
   */
  static fromState(state) {
    return new OriginSection({
      onOffFarm: {
        page: onOffFarmPage,
        answer: onOffFarmPage.Answer.fromState(state?.onOffFarm)
      },
      cphNumber: {
        page: cphNumberPage,
        answer: cphNumberPage.Answer.fromState(state?.cphNumber)
      },
      address: {
        page: originAddressPage,
        answer: originAddressPage.Answer.fromState(state?.address)
      }
    })
  }
}
