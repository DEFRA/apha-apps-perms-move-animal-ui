/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { checkAnswers } from './check-answers/index.js'
import { FmdSectionModel } from '../section-model.js'
import { mockOrigin } from './mock-page/index.js'
import { AboutSection } from '../about/section.js'
import { tla, tlaPage } from './tla/index.js'
import { premisesType, premisesTypePage } from './premises-type/index.js'

const plugin = {
  plugin: {
    name: 'fmd-origin',
    async register(server) {
      await server.register([checkAnswers, mockOrigin, tla, premisesType])
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
    isEnabled: (context) => AboutSection.fromState(context).validate().isValid,
    isVisible: () => true
  }

  static firstPageFactory = (context) => {
    if (context.about?.whatIsMoving === 'milk') {
      return premisesTypePage
    }
    return tlaPage
  }
}
