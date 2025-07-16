import { ExoticsApplicationModel } from './application.js'
import { ApplicationModel } from '../common/model/application/application.js'
import { AboutSection } from './about/section.js'
import { DestinationSection } from './destination/section.js'
import { LicenceSection } from './licence/section.js'
import { LocationOfVisitSection } from './location-of-visit/section.js'
import { MovementDetailsSection } from './movement-details/section.js'
import { OriginSection } from './origin/section.js'
import { VisitDetailsSection } from './visit-details/section.js'

describe('ExoticsApplicationModel', () => {
  const model = new ExoticsApplicationModel({})

  it('should extend ApplicationModel', () => {
    expect(model).toBeInstanceOf(ApplicationModel)
  })

  it('should have the correct implementedSections in the expected order', () => {
    expect(ExoticsApplicationModel.implementedSections).toEqual([
      AboutSection,
      LocationOfVisitSection,
      VisitDetailsSection,
      OriginSection,
      MovementDetailsSection,
      DestinationSection,
      LicenceSection
    ])
  })

  it('should return the correct version', () => {
    expect(model.version).toEqual({ major: 1, minor: 0 })
  })

  it('should return the correct journeyId', () => {
    expect(model.journeyId).toBe(
      'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_EXOTICS'
    )
  })
})
