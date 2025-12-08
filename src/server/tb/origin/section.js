import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { SectionModelV2 } from '~/src/server/common/model/section/section-model/section-model-v2.js'
import { onOffFarmPage } from './on-off-farm/index.js'
import { origin } from '~/src/server/tb/origin/index.js'
import { config } from '~/src/config/config.js'

/**
 * @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js'
 * @import {Request} from '@hapi/hapi'
 * @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js'
 */

// Toggle between V1 and V2 (Defra Forms) implementations
const defraFormsEnabled = config.get('featureFlags')?.defraFormsEnabled

/** @type {typeof SectionModelV1 | typeof SectionModelV2} */
const EnabledSectionModel = defraFormsEnabled ? SectionModelV2 : SectionModelV1

export class OriginSection extends EnabledSectionModel {
  /**
   * @param {Request} req
   * @param {RawApplicationState} state
   * @returns {Promise<OriginSection>}
   */
  static async fromRequest(req, state) {
    // @ts-ignore - TypeScript can't infer that both parent classes have fromRequest
    return super.fromRequest(req, state)
  }
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin: origin,
    summaryLink: defraFormsEnabled
      ? '/tb-origin/summary'
      : '/origin/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  // V1 specific
  static firstPageFactory = () => onOffFarmPage

  // V2 specific
  static journeySlug = 'tb-origin'
}
