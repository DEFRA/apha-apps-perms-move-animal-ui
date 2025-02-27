import { ApplicationModel } from './application.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'
import { BiosecuritySection } from '../section/biosecurity/biosecurity.js'
import { IdentificationSection } from '../section/identification/identification.js'
import { applicationStateWithAnimalIdentifiersSection } from '../../test-helpers/journey-state.js'

const applicationState = applicationStateWithAnimalIdentifiersSection

describe('Application.fromState', () => {
  it('should create an Application instance from a valid state', () => {
    const application = ApplicationModel.fromState(applicationState)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.licence).toBeInstanceOf(LicenceSection)
    expect(application.tasks.identification).toBeInstanceOf(
      IdentificationSection
    )
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)
    expect(application.tasks.biosecurity).toBeInstanceOf(BiosecuritySection)

    expect(application.tasks.origin.questionPageAnswers).toEqual(
      OriginSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.licence.questionPageAnswers).toEqual(
      LicenceSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.identification.questionPageAnswers).toEqual(
      IdentificationSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.destination.questionPageAnswers).toEqual(
      DestinationSection.fromState(applicationState).questionPageAnswers
    )
    expect(application.tasks.biosecurity.questionPageAnswers).toEqual(
      BiosecuritySection.fromState(applicationState).questionPageAnswers
    )
  })
})
