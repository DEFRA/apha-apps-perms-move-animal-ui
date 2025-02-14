import { UploadPlanPage } from '~/src/server/biosecurity-map/upload-plan/index.js'
import { BiosecurityPlanSection } from './biosecurity-plan.js'

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

describe('Biosecurity', () => {
  describe('validate', () => {
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
      expect(result.firstInvalidPage).toBeInstanceOf(UploadPlanPage)
    })
  })
})
