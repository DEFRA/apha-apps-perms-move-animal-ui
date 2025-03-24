import { ApplicationModel } from './application.js'
import { LicenceSection } from '../section/licence/licence.js'
import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'

describe('Application.fromState', () => {
  it('should create an Application instance from a valid state', () => {
    const application = ApplicationModel.fromState(validApplicationState)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.licence).toBeInstanceOf(LicenceSection)
    expect(application.tasks.identification).toBeUndefined()
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)

    expect(application.tasks.origin.questionPageAnswers).toEqual(
      OriginSection.fromState(validApplicationState).questionPageAnswers
    )
    expect(application.tasks.licence.questionPageAnswers).toEqual(
      LicenceSection.fromState(validApplicationState).questionPageAnswers
    )
    expect(application.tasks.destination.questionPageAnswers).toEqual(
      DestinationSection.fromState(validApplicationState).questionPageAnswers
    )
  })
})
