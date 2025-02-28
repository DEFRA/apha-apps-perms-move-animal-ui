import { uploadPlanPage } from '~/src/server/biosecurity-map/upload-plan/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { config } from '~/src/config/config.js'
import { biosecurityPlan } from '~/src/server/biosecurity-map/index.js'
import { OriginSection } from '../origin/origin.js'
import { DestinationSection } from '../destination/destination.js'

/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */
/** @import {SectionConfig} from '../section-model/section-model.js' */

/** @param {RawApplicationState} app */
const isVisible = (app) => {
  const isBiosecurityFlag = config.get('featureFlags')?.biosecurity
  const isDestinationNotAfu = app.destination?.destinationType !== 'afu'
  return (
    isBiosecurityFlag &&
    OriginSection.fromState(app).validate().isValid &&
    DestinationSection.fromState(app).validate().isValid &&
    isDestinationNotAfu
  )
}

export class BiosecurityPlanSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'biosecurity-map',
    title: 'Biosecurity map',
    plugin: biosecurityPlan,
    summaryLink: '/biosecurity-map/check-answers',
    isEnabled: () => true,
    isVisible
  }

  static firstPageFactory = () => uploadPlanPage
}
