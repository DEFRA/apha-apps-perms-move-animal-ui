import { destination } from '~/src/server/destination/index.js'
import { OriginSection } from '../origin/origin.js'
import { SectionModel } from '../section-model/section-model.js'
import { StateManager } from '../../state/state-manager.js'
import { destinationTypePage } from '~/src/server/destination/destination-type/index.js'

/** @import {RawApplicationState} from '../../state/state-manager.js' */

/**
 * export @typedef {{
 * destinationType: DestinationTypeData | undefined;
 * }} DestinationData
 * @import {DestinationTypeData} from '../../answer/destination-type/destination-type.js'
 */
export class DestinationSection extends SectionModel {
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin: destination,
    summaryLink: '/destination/check-answers',
    isEnabled: (req) =>
      OriginSection.fromState(
        req.yar.get('origin'),
        new StateManager(req).toState()
      ).validate().isValid,
    isVisible: true
  }

  static firstPageFactory = () => destinationTypePage

  /**
   * @param {DestinationData | undefined} data
   * @param {RawApplicationState} context
   */
  static fromState(data, context) {
    return super.fromState(data, context)
  }
}
