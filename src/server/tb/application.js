import { DestinationSection } from '../common/model/section/destination/destination.js'
import { LicenceSection } from '../common/model/section/licence/licence.js'
import { OriginSection } from '../common/model/section/origin/origin.js'
import { BiosecuritySection } from '../common/model/section/biosecurity/biosecurity.js'
import { BiosecurityPlanSection } from '../common/model/section/biosecurity-plan/biosecurity-plan.js'
import { IdentificationSection } from '../common/model/section/identification/identification.js'
import { ApplicationModel } from '../common/model/application/application.js'

/**
 * @import { SectionModel } from '../common/model/section/section-model/section-model.js'
 */

export class TbApplicationModel extends ApplicationModel {
  // This is a list of all the sections that are implemented in the application.
  // The order in this array drives the order in which the sections are displayed.
  /** @type {typeof SectionModel[]} */
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
      major: 1,
      minor: 1
    }
  }

  get journeyId() {
    return 'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_TB_ENGLAND'
  }
}
