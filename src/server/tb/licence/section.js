import { licence } from '~/src/server/tb/licence/index.js'
import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { fullNamePage } from '~/src/server/tb/licence/full-name/index.js'
import { fullNameFuturePage } from '~/src/server/tb/licence/full-name-future/index.js'
import { OriginSection } from '../origin/section.js'
import { DestinationSection } from '../destination/section.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'

/** @import {SectionModel, SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class LicenceSection extends SectionModelV1 {
  /** @type {SectionConfig} */
  static config = {
    key: 'licence',
    title: 'Receiving the licence',
    plugin: licence,
    summaryLink: '/receiving-the-licence/check-answers',
    isEnabled: async (app, req) =>
      !!req &&
      /** @type {SectionModel} */ (
        await OriginSection.fromRequest(req, app)
      ).validate().isValid &&
      (await DestinationSection.fromRequest(req, app)).validate().isValid,
    isVisible: () => true
  }

  static firstPageFactory = (applicationState) => {
    if (
      applicationState?.origin?.onOffFarm === 'off' ||
      applicationState?.origin?.originType === 'afu' ||
      OriginTypeAnswer.isTbRestricted(applicationState?.origin?.originType) ||
      applicationState?.origin?.originType === 'iso-unit'
    ) {
      return fullNamePage
    }
    return fullNameFuturePage
  }
}
