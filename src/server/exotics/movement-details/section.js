/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

import { AboutSection } from '../about/section.js'
import { ExoticsSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { reason, reasonPage } from './reason/index.js'

const plugin = {
  plugin: {
    name: 'exotics-movementDetails',
    async register(server) {
      await server.register([checkAnswers, reason])
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

export class MovementDetailsSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'movementDetails',
    title: 'Movement details',
    plugin,
    summaryLink: '/exotics/movement-details/check-answers',
    isEnabled: sectionAvailable,
    isVisible: sectionAvailable
  }

  static firstPageFactory = () => reasonPage
}
