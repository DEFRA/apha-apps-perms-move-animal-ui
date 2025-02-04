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
  static config = {
    title: 'Movement destination',
    summaryLink: '/destination/check-answers',
    isEnabled: (req) =>
      OriginSection.fromState(req.yar.get('origin')).validate().isValid
  }

  static firstPageFactory = () => destinationTypePage

  /**
   * @param {DestinationData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }
}
