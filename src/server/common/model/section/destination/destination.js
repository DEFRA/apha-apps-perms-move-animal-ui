import { OriginSection } from '../origin/origin.js'
import { SectionModel } from '../section-model/section-model.js'
import { destinationTypePage } from '~/src/server/destination/destination-type/index.js'

/**
 * export @typedef {{
 * destinationType: DestinationTypeData | undefined;
 * }} DestinationData
 * @import {DestinationTypeData} from '../../answer/destination-type/destination-type.js'
 */
export class DestinationSection extends SectionModel {
  static firstPageFactory = () => destinationTypePage

  /**
   * @param {DestinationData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }

  buildGdsTaskDetails(req) {
    const sectionValidity = this.validate()
    return {
      title: 'Movement destination',
      initialLink:
        sectionValidity.firstInvalidPage?.urlPath ?? this.firstPage.urlPath,
      summaryLink: '/receiving-the-licence/check-answers',
      isValid: sectionValidity.isValid,
      isEnabled: OriginSection.fromState(req.yar.get('origin')).validate()
        .isValid
    }
  }
}
