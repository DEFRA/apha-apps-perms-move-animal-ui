import { SectionModel } from '../section/section-model/index.js'
import { destinationTypePage } from '~/src/server/destination/destination-type/index.js'

/**
 * export @typedef {{
 * destinationType: DestinationTypeData | undefined;
 * }} DestinationData
 * @import {DestinationTypeData} from '../answer/destination-type/destination-type.js'
 */
export class Destination extends SectionModel {
  firstPage = destinationTypePage

  get destinationType() {
    return this._data?.destinationType.answer
  }

  /**
   * @param {DestinationData | undefined} state
   * @returns {Destination}
   */
  static fromState(state) {
    return new Destination({
      destinationType: {
        page: destinationTypePage,
        answer: destinationTypePage.Answer.fromState(state?.destinationType)
      }
    })
  }
}
