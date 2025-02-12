import { SectionModel } from '../section-model/section-model.js'
import { onOffFarmPage } from '../../../../origin/on-off-farm/index.js'
import { origin } from '~/src/server/origin/index.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */

export class OriginSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin: origin,
    summaryLink: '/origin/check-answers',
    isEnabled: () => true,
    isVisible: true
  }

  static firstPageFactory = () => onOffFarmPage
}
