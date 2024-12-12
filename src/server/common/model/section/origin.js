import { SectionModel } from '../section/section-model/index.js'
import { CphNumber } from '../answer/cph-number.js'
import { Address } from '../answer/address.js'

import { OnOffFarm } from '../answer/on-off-farm.js'
import { OnOffFarmPage } from '../../../origin/on-off-farm/index.js'
import { CphNumberPage } from '../../../origin/cph-number/index.js'
import { OriginAddressPage } from '../../../origin/address/index.js'

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
  firstPage = new OnOffFarmPage()

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
   * @returns {Origin}
   */
  static fromState(state) {
    return new Origin({
      onOffFarm: {
        page: new OnOffFarmPage(),
        answer: OnOffFarm.fromState(state?.onOffFarm)
      },
      cphNumber: {
        page: new CphNumberPage(),
        answer: CphNumber.fromState(state?.cphNumber)
      },
      address: {
        page: new OriginAddressPage(),
        answer: Address.fromState(state?.address)
      }
    })
  }
}
