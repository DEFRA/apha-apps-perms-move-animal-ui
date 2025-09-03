/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { checkAnswers } from './check-answers/index.js'
import { FmdSectionModel } from '../section-model.js'
import { mockOrigin, mockOriginPage } from './mock-page/index.js'

const plugin = {
  plugin: {
    name: 'fmd-origin',
    async register(server) {
      await server.register([checkAnswers, mockOrigin])
    }
  }
}

export class OriginSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'origin',
    title: 'Movement origin',
    plugin,
    summaryLink: '/fmd/movement-origin/check-answers',
    isEnabled: () => false,
    isVisible: () => false
  }

  static firstPageFactory = () => mockOriginPage
}
