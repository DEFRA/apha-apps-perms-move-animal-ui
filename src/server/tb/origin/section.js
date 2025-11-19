import { SectionModelV2 } from '~/src/server/common/model/section/section-model/section-model-v2.js'
import { origin } from '~/src/server/tb/origin/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class OriginSection extends SectionModelV2 {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin: origin,
    summaryLink: '/tb-origin/summary',
    isEnabled: () => true,
    isVisible: () => true
  }

  static journeySlug = 'tb-origin'
}
