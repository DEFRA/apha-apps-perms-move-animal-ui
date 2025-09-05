import { FmdApplicationModel } from './application.js'
import { ApplicationModel } from '../common/model/application/application.js'
import { AboutSection } from './about/section.js'
import { DestinationSection } from './destination/section.js'
import { LicenceSection } from './licence/section.js'
import { MovementDetailsSection } from './movement-details/section.js'
import { OriginSection } from './origin/section.js'
import { SlaughterInformationSection } from './slaughter/section.js'
import { DisposalSection } from './disposal/section.js'

describe('FmdApplicationModel', () => {
  const model = new FmdApplicationModel({})

  it('should extend ApplicationModel', () => {
    expect(model).toBeInstanceOf(ApplicationModel)
  })

  it('should have the correct implementedSections in the expected order', () => {
    expect(FmdApplicationModel.implementedSections).toEqual([
      AboutSection,
      DestinationSection,
      OriginSection,
      MovementDetailsSection,
      LicenceSection,
      SlaughterInformationSection,
      DisposalSection
    ])
  })

  it('should return the correct version', () => {
    expect(model.version).toEqual({ major: 1, minor: 0 })
  })

  it('should return the correct journeyId', () => {
    expect(model.journeyId).toBe(
      'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_FMD'
    )
  })
})
