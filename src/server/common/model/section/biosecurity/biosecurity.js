import { keptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { config } from '~/src/config/config.js'
import { biosecurity } from '~/src/server/biosecurity/index.js'
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

export class BiosecuritySection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'biosecurity',
    title: 'Biosecurity details',
    plugin: biosecurity,
    summaryLink: '/biosecurity/check-answers',
    isEnabled: () => true,
    isVisible
  }

  static firstPageFactory = () => keptSeparatelyPage
}
