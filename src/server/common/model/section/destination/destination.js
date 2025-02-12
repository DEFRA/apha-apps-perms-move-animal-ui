import { destination } from '~/src/server/destination/index.js'
import { OriginSection } from '../origin/origin.js'
import { SectionModel } from '../section-model/section-model.js'
import { StateManager } from '../../state/state-manager.js'
import { destinationTypePage } from '~/src/server/destination/destination-type/index.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */

export class DestinationSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin: destination,
    summaryLink: '/destination/check-answers',
    isEnabled: (req) =>
      OriginSection.fromState(new StateManager(req).toState()).validate()
        .isValid,
    isVisible: true
  }

  static firstPageFactory = () => destinationTypePage
}
