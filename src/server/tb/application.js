import { DestinationSection } from './destination/section.js'
import { LicenceSection } from './licence/section.js'
import { OriginSection } from './origin/section.js'
import { BiosecuritySection } from './biosecurity/section.js'
import { BiosecurityPlanSection } from './biosecurity-map/section.js'
import { IdentificationSection } from './identification/section.js'
import { ApplicationModel } from '../common/model/application/application.js'

/**
 * @import { SectionModel } from '../common/model/section/section-model/section-model.js'
 */

export class TbApplicationModel extends ApplicationModel {
  // This is a list of all the sections that are implemented in the application.
  // The order in this array drives the order in which the sections are displayed.
  static implementedSections = [
    OriginSection,
    DestinationSection,
    LicenceSection,
    IdentificationSection,
    BiosecuritySection,
    BiosecurityPlanSection
  ]

  get version() {
    return {
      major: 2,
      minor: 1
    }
  }

  get journeyId() {
    return 'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_TB_ENGLAND'
  }
}
