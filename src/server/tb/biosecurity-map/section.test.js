import { UploadPlanPage } from '~/src/server/tb/biosecurity-map/upload-plan/index.js'
import { BiosecurityPlanSection } from './section.js'
import {
  validApplicationState,
  validOriginSectionState,
  validDestinationSectionState
} from '../../common/test-helpers/journey-state.js'
/** @import {DestinationTypeData} from '../../common/model/answer/destination-type/destination-type.js' */
/** @import {OnOffFarmData} from '../../common/model/answer/on-off-farm/on-off-farm.js' */

const validBiosecurityPlanData = {
  'upload-plan': {
    metadata: {
      uploadId: '2ac91a2d-1910-48d0-83af-01cbeb370ca2',
      uploadUrl:
        'http://localhost:7337/upload-and-scan/2ac91a2d-1910-48d0-83af-01cbeb370ca2',
      statusUrl:
        'http://localhost:7337/status/2ac91a2d-1910-48d0-83af-01cbeb370ca2'
    },
    status: {
      uploadStatus: 'ready',
      metadata: {},
      form: {
        crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
        nextPage: '/biosecurity-map/check-answers',
        file: {
          fileId: '73ee6bac-dfae-4886-b56e-a2658a7905aa',
          filename: '34998B77-FB3E-44DB-BC0E-05154D6549E0.jpeg',
          contentType: 'image/jpeg',
          fileStatus: 'complete',
          contentLength: 374478,
          checksumSha256: '3etoXNlR16WpgCiwylqccFxLVg3OrZvpGUqmigmrhcU=',
          detectedContentType: 'image/jpeg',
          s3Key:
            'biosecurity-map/2ac91a2d-1910-48d0-83af-01cbeb370ca2/73ee6bac-dfae-4886-b56e-a2658a7905aa',
          s3Bucket: 'apha'
        }
      },
      numberOfRejectedFiles: 0
    }
  }
}

const invalidBiosecurityPlanData = {
  'upload-plan': {
    metadata: {
      uploadId: '2ac91a2d-1910-48d0-83af-01cbeb370ca2',
      uploadUrl:
        'http://localhost:7337/upload-and-scan/2ac91a2d-1910-48d0-83af-01cbeb370ca2',
      statusUrl:
        'http://localhost:7337/status/2ac91a2d-1910-48d0-83af-01cbeb370ca2'
    },
    status: {
      uploadStatus: 'ready',
      metadata: {},
      form: {
        crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
        nextPage: '/biosecurity-map/check-answers'
      },
      numberOfRejectedFiles: 0
    }
  }
}

describe('Biosecurity.validate', () => {
  it('should return valid if all nested objects are valid', () => {
    const biosecurityData = validBiosecurityPlanData
    const result = BiosecurityPlanSection.fromState({
      'biosecurity-map': biosecurityData
    }).validate()

    expect(result.isValid).toBe(true)
  })

  it('should return invalid if any nested object is invalid', () => {
    const result = BiosecurityPlanSection.fromState({
      'biosecurity-map': invalidBiosecurityPlanData
    }).validate()

    expect(result.isValid).toBe(false)
    expect(result.firstInvalidPageUrl).toBe(new UploadPlanPage().urlPath)
  })
})

describe('Biosecurity.config.isVisible', () => {
  afterEach(jest.restoreAllMocks)

  const { origin, destination } = validApplicationState
  const appState = { origin, destination }

  it('should be visible if movement is on farm & destination premises is not AFU', () => {
    const isVisible = BiosecurityPlanSection.config.isVisible(appState)
    expect(isVisible).toBe(true)
  })

  it('should not be visible if origin is incomplete', () => {
    const isVisible = BiosecurityPlanSection.config.isVisible({
      origin: { onOffFarm: origin.onOffFarm },
      destination
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if destination is incomplete', () => {
    const isVisible = BiosecurityPlanSection.config.isVisible({
      origin,
      destination: { destinationType: destination.destinationType }
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if destination is AFU', () => {
    const isVisible = BiosecurityPlanSection.config.isVisible({
      origin,
      destination: {
        /** @type {DestinationTypeData} */
        destinationType: 'afu'
      }
    })

    expect(isVisible).toBe(false)
  })

  it('should not be visible if movement is off the farm', () => {
    const isVisible = BiosecurityPlanSection.config.isVisible({
      origin: validOriginSectionState,
      destination: validDestinationSectionState
    })

    expect(isVisible).toBe(false)
  })
})
