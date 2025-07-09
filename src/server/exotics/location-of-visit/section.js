/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { ExoticsSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { cphNumber } from './cph-number/index.js'
import {
  locationOfVisit,
  locationOfVisitPage
} from './type-of-location/index.js'

const plugin = {
  plugin: {
    name: 'exotics-locationOfVisit',
    async register(server) {
      await server.register([checkAnswers, locationOfVisit, cphNumber])
    }
  }
}

export class LocationOfVisitSection extends ExoticsSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'locationOfVisit',
    title: 'Location of visit',
    plugin,
    summaryLink: '/exotics/location-of-visit/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => locationOfVisitPage
}
