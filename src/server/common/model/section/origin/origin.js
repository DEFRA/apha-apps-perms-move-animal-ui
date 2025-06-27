import { TbSectionModel } from '../../../../tb/section-model.js'
import { onOffFarmPage } from '../../../../tb/origin/on-off-farm/index.js'
import { origin } from '~/src/server/tb/origin/index.js'

/** @import {SectionConfig} from '../../../../tb/section-model.js' */

export class OriginSection extends TbSectionModel {
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
