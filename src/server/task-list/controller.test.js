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
  grazingFieldHowSeparated: 'some details'
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
      'Biosecurity details'
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
    expect(payload).toEqual(expect.stringContaining(`4 out of 4`))
    expect(payload).toEqual(expect.stringContaining('govuk-button--secondary'))
  })

  it('should state all section complete, and have a green button', async () => {
    await session.setState('origin', validOriginState)

    await session.setState('destination', validDestinationState)

    await session.setState('licence', validLicenceState)

    await session.setState('biosecurity', validBiosecurityState)

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
