import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTester from '~/src/server/common/test-helpers/session-helper.js'
import { submitSummaryPage } from '../../check-answers/index.js'

/** @import { Server } from '@hapi/hapi' */

const pageUrl = '/biosecurity-map/size-error'

const defaultState = {
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

describe('SizeErrorPageController', () => {
  /** @type {Server} */
  let server

  /** @type {SessionTester} */
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('Should process the result and provide expected response', () => {
    it('should redirect to final check answers page, updating the uploaded file status & preserving the rest of the section state', async () => {
      await session.setSectionState('biosecurity-map', defaultState)
      const { headers, statusCode } = await server.inject(
        withCsrfProtection(
          {
            method: 'POST',
            url: pageUrl,
            payload: {}
          },
          {
            Cookie: session.sessionID
          }
        )
      )

      expect(statusCode).toBe(statusCodes.redirect)
      expect(headers.location).toBe(submitSummaryPage.urlPath)

      const state = await session.getSectionState('biosecurity-map')
      expect(state['upload-plan'].status.uploadStatus).toBe('skipped')
    })
  })
})
