import { OriginSection } from '../section/origin/origin.js'
import { DestinationSection } from '../section/destination/destination.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { ApplicationModel } from './application.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

class TestApplication extends ApplicationModel {
  static implementedSections = [OriginSection, DestinationSection]

  get version() {
    return {
      major: 1,
      minor: 1
    }
  }

  get journeyId() {
    return 'TEST_APPLICATION'
  }
}

describe('Application.applicationData', () => {
  it('should render application data in the datastructure expected', () => {
    const application = TestApplication.fromState(validApplicationState)

    expect(application.caseManagementData).toMatchSnapshot()
  })
})

describe('Application.fromState', () => {
  it('should create an Application instance from a valid state', () => {
    const application = TestApplication.fromState(validApplicationState)

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)

    expect(application.tasks.origin.questionPageAnswers).toEqual(
      OriginSection.fromState(validApplicationState).questionPageAnswers
    )

    expect(application.tasks.destination.questionPageAnswers).toEqual(
      DestinationSection.fromState(validApplicationState).questionPageAnswers
    )
  })
})

describe('Application.version', () => {
  it('should throw if not overridden', () => {
    expect(() => new ApplicationModel({}).version).toThrow(NotImplementedError)
  })
})

describe('Application.journeyId', () => {
  it('should throw if not overriden', () => {
    expect(() => new ApplicationModel({}).version).toThrow(NotImplementedError)
  })
})
