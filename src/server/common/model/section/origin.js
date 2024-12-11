import { SectionModel } from '../section/section-model.js'
import { OnOffFarm } from '../answer/on-off-farm.js'
import { CphNumber } from '../answer/cph-number.js'
import { Address } from '../answer/address.js'
import { OnOffFarmPage } from '../../../origin/on-off-farm/index.js'

/**
 * export @typedef {{
 * onOffFarm: OnOffFarmData | undefined;
 * cphNumber: CphNumberData | undefined;
 * address: AddressData | undefined;
 * }} OriginData
 * @import {OnOffFarmData} from '../answer/on-off-farm.js'
 * @import {CphNumberData} from '../answer/cph-number.js'
 * @import {AddressData} from '../answer/address.js'
 */

export class Origin extends SectionModel {
  title = 'Movement origin'
  initialPage = new OnOffFarmPage()
  summaryPageLink = '/origin/summary'

  get onOffFarm() {
    return this._data?.onOffFarm
  }

  get cphNumber() {
    return this._data?.cphNumber
  }

  get address() {
    return this._data?.address
  }

  get isEnabled() {
    const isEnabled = true
    return isEnabled
  }

  /**
   * @param {OriginData | undefined} state
   * @returns {Origin}
   */
  static fromState(state) {
    const instance = new Origin({
      onOffFarm: OnOffFarm.fromState(state?.onOffFarm),
      cphNumber: CphNumber.fromState(state?.cphNumber),
      address: Address.fromState(state?.address)
    })
    instance.seal()

    return instance
  }
}
