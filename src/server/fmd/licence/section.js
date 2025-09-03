/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { FmdSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { mockLicence, mockLicencePage } from './mock-page/index.js'

const plugin = {
  plugin: {
    name: 'fmd-licence',
    async register(server) {
      await server.register([mockLicence, checkAnswers])
    }
  }
}

export class LicenceSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'licence',
    title: 'Receiving the licence',
    plugin,
    summaryLink: '/fmd/receiving-the-licence/check-answers',
    isEnabled: () => false,
    isVisible: () => false
  }

  static firstPageFactory = () => mockLicencePage
}
