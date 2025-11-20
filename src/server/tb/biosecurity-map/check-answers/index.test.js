import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'
import { biosecurityPlanSummaryPage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { uploadPlanPage } from '../upload-plan/index.js'

const pageUrl = '/biosecurity-map/check-answers'

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

describe('#biosecurityPlanSummaryPage', () => {
  /** @type {Server} */
  let server
  /** @type {SessionTestHelper} */
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
    session = await SessionTestHelper.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('should render expected response when valid file uploaded', async () => {
    await session.setSectionState('biosecurity-map', defaultState)

    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: pageUrl
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(biosecurityPlanSummaryPage.pageTitle)
    expect(statusCode).toBe(statusCodes.ok)

    expect(payload).toEqual(expect.stringContaining('Map uploaded'))
  })

  it('should redirect user to upload page if they`ve not selected a file', async () => {
    await session.setSectionState('biosecurity-map', {
      'upload-plan': {
        metadata: {
          uploadId: '2ac91a2d-1910-48d0-83af-01cbeb370ca2',
          uploadUrl:
            'http://localhost:7337/upload-and-scan/2ac91a2d-1910-48d0-83af-01cbeb370ca2',
          statusUrl:
            'http://localhost:7337/status/2ac91a2d-1910-48d0-83af-01cbeb370ca2'
        }
      }
    })

    const { statusCode, headers } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: pageUrl
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(
      `${uploadPlanPage.urlPath}?returnUrl=${biosecurityPlanSummaryPage.urlPath}`
    )
  })
})

describePageSnapshot({
  describes: '#biosecurityPlanSummaryPage.content',
  it: 'should render the expected content',
  pageUrl,
  state: {
    application: { 'biosecurity-map': defaultState }
  }
})

/**
 * @import { Server } from '@hapi/hapi'
 */
