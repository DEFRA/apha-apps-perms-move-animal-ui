import { SectionModel } from '../../section/section-model/index.js'
import { destinationTypePage } from '~/src/server/destination/destination-type/index.js'

/**
 * export @typedef {{
 * destinationType: DestinationTypeData | undefined;
 * }} DestinationData
 * @import {DestinationTypeData} from '../../answer/destination-type/destination-type.js'
 */
export class DestinationSection extends SectionModel {
  firstPage = destinationTypePage

  get destinationType() {
    return this._data?.destinationType.answer
  }

  /**
   * @param {DestinationData | undefined} state
   * @returns {DestinationSection}
   */
  static fromState(state) {
    return new DestinationSection({
      destinationType: {
        page: destinationTypePage,
        answer: destinationTypePage.Answer.fromState(state?.destinationType)
      }
    })
  }
}
