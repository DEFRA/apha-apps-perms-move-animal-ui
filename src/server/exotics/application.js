import { ApplicationModel } from '../common/model/application/application.js'
import { AboutSection } from './about/section.js'
import { DestinationSection } from './destination/section.js'
import { LicenceSection } from './licence/section.js'
import { LocationOfVisitSection } from './location-of-visit/section.js'
import { MovementDetailsSection } from './movement-details/section.js'
import { OriginSection } from './origin/section.js'
import { VisitDetailsSection } from './visit-details/section.js'

/**
 * @import { SectionModelV1 } from '../common/model/section/section-model/section-model.js'
 */

export class ExoticsApplicationModel extends ApplicationModel {
  /** @type {typeof SectionModelV1[]} */
  static implementedSections = [
    AboutSection,
    DestinationSection,
    OriginSection,
    MovementDetailsSection,
    LocationOfVisitSection,
    VisitDetailsSection,
    LicenceSection
  ]

  get version() {
    return {
      major: 1,
      minor: 0
    }
  }

  get journeyId() {
    return 'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_EXOTICS'
  }
}
