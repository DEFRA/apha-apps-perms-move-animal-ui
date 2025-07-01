import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js'
import { onOffFarmPage } from './on-off-farm/index.js'
import { origin } from '~/src/server/tb/origin/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class OriginSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin: origin,
    summaryLink: '/origin/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => onOffFarmPage
}
