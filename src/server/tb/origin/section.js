import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { SectionModelV2 } from '~/src/server/common/model/section/section-model/section-model-v2.js'
import { onOffFarmPage } from './on-off-farm/index.js'
import { origin } from '~/src/server/tb/origin/index.js'
import { config } from '~/src/config/config.js'

/**
 * @import {SectionConfig, SectionModel} from '~/src/server/common/model/section/section-model/section-model.js'
 */

export class OriginSectionV1 extends SectionModelV1 {
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

export class OriginSectionV2 extends SectionModelV2 {
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

const defraFormsEnabled = config.get('featureFlags')?.defraFormsEnabled

/** @type {typeof SectionModel} OriginSection */
export const OriginSection = defraFormsEnabled
  ? OriginSectionV2
  : OriginSectionV1
