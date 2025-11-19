import { ApplicationModel } from '../common/model/application/application.js'
import { AboutSection } from './about/section.js'
import { DestinationSection } from './destination/section.js'
import { DisposalSection } from './disposal/section.js'
import { LicenceSection } from './licence/section.js'
import { MovementDetailsSection } from './movement/section.js'
import { OriginSection } from './origin/section.js'
import { SlaughterInformationSection } from './slaughter/section.js'

/**
 * @import { SectionModelV1 } from '../common/model/section/section-model/section-model.js'
 */

export class FmdApplicationModel extends ApplicationModel {
  /** @type {typeof SectionModelV1[]} */
  static implementedSections = [
    AboutSection,
    OriginSection,
    SlaughterInformationSection,
    DestinationSection,
    DisposalSection,
    MovementDetailsSection,
    LicenceSection
  ]

  get version() {
    return {
      major: 1,
      minor: 0
    }
  }

  get journeyId() {
    return 'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_FMD'
  }
}
