/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { checkAnswers } from './check-answers/index.js'
import { ExoticsSectionModel } from '../section-model.js'

const plugin = {
  plugin: {
    name: 'exotics-origin',
    async register(server) {
      await server.register([checkAnswers])
    }
  }
}

export class OriginSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin,
    summaryLink: '/exotics/movement-origin/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => {
    throw new Error('Origin section does not have a first page factory defined')
  }
}
