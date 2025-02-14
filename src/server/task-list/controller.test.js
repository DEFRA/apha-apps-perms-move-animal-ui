import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { withCsrfProtection } from '../common/test-helpers/csrf.js'
import SessionTester from '../common/test-helpers/session-helper.js'

const validOriginState = {
  address: {
    addressLine1: '#####',
    addressLine2: '#####',
    addressTown: '#####',
    addressCounty: '#####',
    addressPostcode: 'RG24 8RR'
  },
  originType: 'afu',
  onOffFarm: 'off',
  cphNumber: '12/345/6789'
}

const validDestinationState = {
  destinationType: 'dedicated-sale'
}

const validLicenceState = {
  fullName: {
    firstName: 'Kathryn',
    lastName: 'Janeway'
  },
  receiveMethod: 'email',
  emailAddress: 'kathryn@starfleet.com'
}

const validBiosecurityState = {
  keptSeparately: 'yes',
  grazing: 'yes',
  lastGrazed: 'yesterday',
  manureAndSlurry: 'yes',
  grazingFieldHowSeparated: 'some details',
  roadsAndTracks: 'yes',
  buildingsAnyShared: 'yes',
  buildingsHowMinimiseContamination: 'somehow',
  peopleDisinfection: 'ppe',
  disinfectant: 'some disinfectant',
  dilutionRate: '15'
}

const validBiosecurityMapState = {
  'upload-plan': {
    metadata: {
      uploadId: '41572cf8-2e37-495e-9ad2-0b0f23f1b277',
      uploadUrl:
        'http://localhost:7337/upload-and-scan/41572cf8-2e37-495e-9ad2-0b0f23f1b277',
      statusUrl:
        'http://localhost:7337/status/41572cf8-2e37-495e-9ad2-0b0f23f1b277'
    },
    status: {
      uploadStatus: 'ready',
      metadata: {},
      form: {
        crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
        nextPage: '',
        file: {
          fileId: '3d3c2a09-2888-4199-9bd6-ac7eda3125f0',
          filename: '34998B77-FB3E-44DB-BC0E-05154D6549E0.jpeg',
          contentType: 'image/jpeg',
          fileStatus: 'complete',
          contentLength: 374478,
          checksumSha256: '3etoXNlR16WpgCiwylqccFxLVg3OrZvpGUqmigmrhcU=',
          detectedContentType: 'image/jpeg',
          s3Key:
            'biosecurity-map/41572cf8-2e37-495e-9ad2-0b0f23f1b277/3d3c2a09-2888-4199-9bd6-ac7eda3125f0',
          s3Bucket: 'apha'
        }
      },
      numberOfRejectedFiles: 0
    }
  }
}

describe('#taskListController', () => {
  /** @type {Server} */
  let server
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

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/task-list'
    })

    expect(parseDocument(payload).title).toBe(
      'Your Bovine Tuberculosis (TB) movement licence application'
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should return the correct task list items', async () => {
    const { payload } = await server.inject({
      method: 'GET',
      url: '/task-list'
    })

    const document = parseDocument(payload)
    const taskTitles = Array.from(
      document.querySelectorAll('.govuk-task-list__name-and-hint')
    ).map((el) => el.textContent?.trim())

    expect(taskTitles).toEqual([
      'Movement origin',
      'Movement destination',
      'Receiving the licence',
      'Biosecurity details',
      'Biosecurity map'
    ])
  })

  it('Should redirect to check-answers', async () => {
    const { statusCode, headers } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/task-list'
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/check-answers')
  })

  it('Should show completed sections', async () => {
    await session.setState('origin', validOriginState)

    const { statusCode, payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/task-list'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(expect.stringContaining(`Completed`))
  })

  it('should say that there are incomplete sections, and have a greyed out button', async () => {
    const { statusCode, payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/task-list'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(expect.stringContaining(`5 out of 5`))
    expect(payload).toEqual(expect.stringContaining('govuk-button--secondary'))
  })

  it('should state all section complete, and have a green button', async () => {
    await session.setState('origin', validOriginState)
    await session.setState('destination', validDestinationState)
    await session.setState('licence', validLicenceState)
    await session.setState('biosecurity', validBiosecurityState)
    await session.setState('biosecurity-map', validBiosecurityMapState)

    const { statusCode, payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/task-list'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(
      expect.stringContaining('You have completed all sections.')
    )
    expect(payload).not.toEqual(
      expect.stringContaining('govuk-button--secondary')
    )
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
