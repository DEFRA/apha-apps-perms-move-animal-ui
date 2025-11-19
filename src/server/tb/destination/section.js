import { destination } from '~/src/server/tb/destination/index.js'
import { OriginSection } from '../origin/section.js'
import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { destinationTypePage } from '~/src/server/tb/destination/destination-type/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model-v1.js' */

export class DestinationSection extends SectionModelV1 {
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
