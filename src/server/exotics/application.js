import { ApplicationModel } from '../common/model/application/application.js'
import { AboutSection } from './about/section.js'
import { LocationOfVisitSection } from './location-of-visit/section.js'
import { OriginSection } from './origin/section.js'
import { VisitDetailsSection } from './visit-details/section.js'

/**
 * @import { SectionModel } from '../common/model/section/section-model/section-model.js'
 */

export class ExoticsApplicationModel extends ApplicationModel {
  /** @type {typeof SectionModel[]} */
  static implementedSections = [
    AboutSection,
    OriginSection,
    VisitDetailsSection,
    LocationOfVisitSection
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
