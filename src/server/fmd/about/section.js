/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { mockAboutPage, mockAbout } from './mock-page/index.js'

const plugin = {
  plugin: {
    name: 'fmd-about',
    async register(server) {
      await server.register([mockAbout, checkAnswers])
    }
  }
}

export class AboutSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'about',
    title: 'About the movement',
    plugin,
    summaryLink: '/fmd/about-the-movement/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => mockAboutPage
}
