/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import { RawApplicationState } from '../../common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { ExoticsSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { date } from './date/index.js'
import { isDurationMoreThanOneDay } from './is-duration-more-than-one-day/index.js'
import { reason, reasonPage } from './reason/index.js'

const plugin = {
  plugin: {
    name: 'exotics-visitDetails',
    async register(server) {
      await server.register([
        checkAnswers,
        reason,
        isDurationMoreThanOneDay,
        date
      ])
    }
  }
}

/** @param {RawApplicationState} context */
const isEnabledAndVisible = (context) =>
  AboutSection.fromState(context).validate().isValid &&
  context.about.movementType === 'visit'

export class VisitDetailsSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'visitDetails',
    title: 'Visit details',
    plugin,
    summaryLink: '/exotics/visit-details/check-answers',
    isEnabled: isEnabledAndVisible,
    isVisible: isEnabledAndVisible
  }

  static firstPageFactory = () => reasonPage
}
