/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { whatIsMovingPage } from '../about/what-is-moving/index.js'
import { ExoticsSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'

const plugin = {
  plugin: {
    name: 'movementOrigin',
    async register(server) {
      await server.register([checkAnswers])
    }
  }
}

export class MovementOriginSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'movementOrigin',
    title: 'Movement origin',
    plugin,
    summaryLink: '/exotics/movement-origin/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => whatIsMovingPage
}
