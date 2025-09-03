/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

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

export class MovementDetailsSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'movementDetails',
    title: 'Movement details',
    plugin,
    summaryLink: '/fmd/movement-details/check-answers',
    isEnabled: () => false,
    isVisible: () => false
  }

  static firstPageFactory = () => mockMovementDetailsPage
}
