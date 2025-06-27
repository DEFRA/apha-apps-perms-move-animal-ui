import { destination } from '~/src/server/tb/destination/index.js'
import { OriginSection } from '../origin/origin.js'
import { TbSectionModel } from '../../../../tb/section-model.js'
import { destinationTypePage } from '~/src/server/tb/destination/destination-type/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class DestinationSection extends TbSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin: destination,
    summaryLink: '/destination/check-answers',
    isEnabled: (app) => OriginSection.fromState(app).validate().isValid,
    isVisible: () => true
  }

  static firstPageFactory = () => destinationTypePage
}
