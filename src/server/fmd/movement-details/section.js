/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { date } from './date/index.js'
import { frequency } from './frequency/index.js'
import { isDurationMoreThanOneDay } from './is-duration-more-than-one-day/index.js'
import { maximumNumberOfJourneys } from './maximum-number-of-journeys/index.js'
import { multipleDates } from './multiple-dates/index.js'
import { reason, reasonPage } from './reason/index.js'

const plugin = {
  plugin: {
    name: 'fmd-movementDetails',
    async register(server) {
      await server.register([
        checkAnswers,
        reason,
        frequency,
        maximumNumberOfJourneys,
        date,
        isDurationMoreThanOneDay,
        multipleDates
      ])
    }
  }
}

/** @param {RawApplicationState} app */
const sectionAvailable = (app) => {
  return (
    app.about?.movementType !== 'visit' &&
    AboutSection.fromState(app).validate().isValid
  )
}

export class MovementDetailsSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'movementDetails',
    title: 'Movement details',
    plugin,
    summaryLink: '/fmd/movement-details/check-answers',
    isEnabled: sectionAvailable,
    isVisible: sectionAvailable
  }

  static firstPageFactory = () => reasonPage
}
