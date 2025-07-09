/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

import { ExoticsSectionModel } from '../section-model.js'
import { checkAnswers } from './check-answers/index.js'
import { cphNeeded } from './cph-needed/index.js'
import { cphNumber } from './cph-number/index.js'
import { hasACphNumber } from './has-a-cph-number/index.js'
import { fieldParcelNumber } from './field-parcel-number/index.js'
import { inRpaRegisteredField } from './in-rpa-registered-field/index.js'
import {
  locationOfVisit,
  locationOfVisitPage
} from './type-of-location/index.js'
import { address } from './address/index.js'

const plugin = {
  plugin: {
    name: 'exotics-locationOfVisit',
    async register(server) {
      await server.register([
        checkAnswers,
        locationOfVisit,
        cphNumber,
        hasACphNumber,
        cphNeeded,
        inRpaRegisteredField,
        fieldParcelNumber,
        address
      ])
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
