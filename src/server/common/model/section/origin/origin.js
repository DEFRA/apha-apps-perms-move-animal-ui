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
  static firstPageFactory = () => onOffFarmPage

  /**
   * @param {OriginData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }

  buildGdsTaskDetails() {
    const sectionValidity = this.validate()
    return {
      title: 'Movement origin',
      initialLink:
        sectionValidity.firstInvalidPage?.urlPath ?? this.firstPage.urlPath,
      summaryLink: '/origin/check-answers',
      isValid: sectionValidity.isValid,
      isEnabled: true
    }
  }
}
