/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { AboutSection } from '../about/section.js'
import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import {
  mockMovementDetails,
  mockMovementDetailsPage
} from './mock-page/index.js'

const plugin = {
  plugin: {
    name: 'fmd-movementDetails',
    async register(server) {
      await server.register([mockMovementDetails, checkAnswers])
    }
  }
}

export const isVisibleAndEnabled = (context) =>
  AboutSection.fromState(context).validate().isValid

export class MovementDetailsSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'movement',
    title: 'Movement details',
    plugin,
    summaryLink: '/fmd/movement-details/check-answers',
    isEnabled: isVisibleAndEnabled,
    isVisible: isVisibleAndEnabled
  }

  static firstPageFactory = (context) => {
    if (context.about?.whatIsMoving === 'milk') {
      return mockMovementDetailsPage
    }

    if (context.about?.whatIsMoving === 'live-animals') {
      return mockMovementDetailsPage
    }

    return mockMovementDetailsPage
  }
}
