import { destination } from '~/src/server/tb/destination/index.js'
import { OriginSection } from '../origin/section.js'
import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js'
import { destinationTypePage } from '~/src/server/tb/destination/destination-type/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class DestinationSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin: destination,
    summaryLink: '/destination/check-answers',
    isEnabled: (app) => {
      return OriginSection.fromState(app).validate().isValid
    },
    isVisible: () => true
  }

  static firstPageFactory = () => destinationTypePage
}
