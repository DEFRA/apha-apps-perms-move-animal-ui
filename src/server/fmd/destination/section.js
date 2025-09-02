/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { mockDestination, mockDestinationPage } from './mock-page/index.js'

const plugin = {
  plugin: {
    name: 'fmd-destination',
    async register(server) {
      await server.register([mockDestination, checkAnswers])
    }
  }
}

export class DestinationSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'destination',
    title: 'Movement destination',
    plugin,
    summaryLink: '/fmd/movement-destination/check-answers',
    isEnabled: () => false,
    isVisible: () => false
  }

  static firstPageFactory = () => mockDestinationPage
}
