import { OriginSection } from '../../../tb/origin/section.js'
import { DestinationSection } from '../../../tb/destination/section.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { ApplicationModel } from './application.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

/**
 * @import { SectionModel } from '../../model/section/section-model/section-model.js'
 * @import { SectionModelV1 } from '../../model/section/section-model/section-model-v1.js'
 */

class TestApplication extends ApplicationModel {
  static implementedSections = /** @type {typeof SectionModel[]} */ ([
    OriginSection,
    DestinationSection
  ])

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

const mockRequest = /** @type { any } */ ({})

describe('Application.applicationData', () => {
  it('should render application data in the datastructure expected', async () => {
    const application = await TestApplication.fromRequest(
      mockRequest,
      validApplicationState
    )

    expect(application.caseManagementData).toMatchSnapshot()
  })
})

describe('Application.fromRequest', () => {
  it('should create an Application instance from a valid state', async () => {
    const application = await TestApplication.fromRequest(
      mockRequest,
      validApplicationState
    )

    expect(application).toBeInstanceOf(ApplicationModel)

    expect(application.tasks.origin).toBeInstanceOf(OriginSection)
    expect(application.tasks.destination).toBeInstanceOf(DestinationSection)

    expect(application.tasks.origin._questionPageAnswers).toEqual(
      /** @type {SectionModelV1} */ (
        OriginSection.fromState(validApplicationState)
      )._questionPageAnswers
    )

    expect(application.tasks.destination._questionPageAnswers).toEqual(
      DestinationSection.fromState(validApplicationState)._questionPageAnswers
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
