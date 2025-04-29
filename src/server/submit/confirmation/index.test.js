import { createServer } from '../../index.js'
import { ConfirmationPage } from './index.js'
import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { validApplicationState } from '../../common/test-helpers/journey-state.js'
import { withCsrfProtection } from '../../common/test-helpers/csrf.js'
import { parseDocument } from '../../common/test-helpers/dom.js'
import { statusCodes } from '../../common/constants/status-codes.js'
import { spyOnConfig } from '../../common/test-helpers/config.js'

const sectionKey = 'confirmation'
const heading = 'Your animal disease movement licence application'
const urlKey = 'submit-confirmation'
const view = 'submit/confirmation/index'
const pageUrl = '/submit/confirmation'

const {
  origin,
  destination,
  licence,
  identification,
  biosecurity,
  'biosecurity-map': biosecurityMap
} = validApplicationState

describe('ConfirmationPage', () => {
  let page

  beforeEach(() => {
    page = new ConfirmationPage()
  })

  it('should have correct url path', () => {
    expect(page.urlPath).toBe(pageUrl)
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
    await session.setSectionState('licence', licence)
    await session.setSectionState('destination', destination)
    await session.setSectionState('identification', identification)
    await session.setSectionState('biosecurity', biosecurity)
    await session.setSectionState('biosecurity-map', biosecurityMap)
  })

  it('Should provide expected response', async () => {
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
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should clear the session on display', async () => {
    spyOnConfig('clearSessionDebug', true)

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
    expect(await session.getSectionState('submit')).toBeUndefined()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })
})
