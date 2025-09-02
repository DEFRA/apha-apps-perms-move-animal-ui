/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import {RawApplicationState} from '~/src/server/common/model/state/state-manager.js' */

import { FmdSectionModel } from '../section-model.js'
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
import { latitudeAndLongitude } from './latitude-and-longitude/index.js'
import { isDesignatedPremises } from './is-designated-premises/index.js'
import { animalsOnPremises } from './animals-on-premises/index.js'
import { AboutSection } from '../about/section.js'

const plugin = {
  plugin: {
    name: 'fmd-locationOfVisit',
    async register(server) {
      await server.register([
        checkAnswers,
        locationOfVisit,
        cphNumber,
        hasACphNumber,
        cphNeeded,
        inRpaRegisteredField,
        fieldParcelNumber,
        address,
        latitudeAndLongitude,
        isDesignatedPremises,
        animalsOnPremises
      ])
    }
  }
}

/** @param {RawApplicationState} app */
const sectionAvailable = (app) => {
  return (
    app.about?.movementType === 'visit' &&
    AboutSection.fromState(app).validate().isValid
  )
}

export class LocationOfVisitSection extends FmdSectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'locationOfVisit',
    title: 'Location of visit',
    plugin,
    summaryLink: '/fmd/location-of-visit/check-answers',
    isEnabled: sectionAvailable,
    isVisible: sectionAvailable
  }

  static firstPageFactory = () => locationOfVisitPage
}
