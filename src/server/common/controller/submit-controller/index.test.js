import SessionTestHelper from '../../test-helpers/session-helper.js'
import { createServer } from '~/src/server/index.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { ConfirmationPage } from './index.js'
import { spyOnConfig } from '../../test-helpers/config.js'
import { withCsrfProtection } from '../../test-helpers/csrf.js'
import { statusCodes } from '../../constants/status-codes.js'

const sectionKey = 'confirmation'
const heading = 'Your animal disease movement licence application'
const urlKey = 'submit-confirmation'
const view = 'common/controller/submit-controller/index'
const pageUrl = '/tb/submit/confirmation'

const { origin, destination, licence } = validApplicationState

describe('ConfirmationPage', () => {
  let page

  beforeEach(() => {
    page = new ConfirmationPage()
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.pageHeading).toBe(heading)
  })

  it('should have the correct questionKey', () => {
    expect(page.urlKey).toBe(urlKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })
})

describe('# Confirmation handler', () => {
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
    await session.setSectionState('origin', origin)
    await session.setSectionState('destination', destination)
    await session.setSectionState('licence', licence)
  })

  it('Should not reset session when clearSessionDebug is true and env is not production', async () => {
    spyOnConfig('clearSessionOnSend', false)

    await session.setState('tb-confirmation-details', {
      reference: 'TB-EXAM-PLE!',
      'state-key': 'application'
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.ok)
    expect(await session.getSectionState('origin')).toBeDefined()
    expect(await session.getSectionState('destination')).toBeDefined()
    expect(await session.getSectionState('licence')).toBeDefined()
    expect(await session.getRawState('tb-confirmation-details')).toBeDefined()
  })

  it('Should reset session when clearSessionDebug is true and env is production', async () => {
    spyOnConfig('clearSessionOnSend', true)

    await session.setState('tb-confirmation-details', {
      reference: 'TB-EXAM-PLE!',
      'state-key': 'application'
    })

    const { statusCode } = await server.inject(
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

    expect(statusCode).toBe(statusCodes.ok)
    expect(await session.getSectionState('origin')).toBeUndefined()
    expect(await session.getSectionState('destination')).toBeUndefined()
    expect(await session.getSectionState('licence')).toBeUndefined()
    expect(await session.getRawState('tb-confirmation-details')).toBeDefined()
  })

  it('should redirect to incomplete if there is no reference in session', async () => {
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
    expect(headers.location).toBe('/tb/task-list-incomplete')
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })
})
