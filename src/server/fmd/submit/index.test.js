import SessionTestHelper from '../../common/test-helpers/session-helper.js'
import { ConfirmationPage } from '../../common/controller/submit-controller/index.js'
import { createServer } from '../../index.js'
import { withCsrfProtection } from '../../common/test-helpers/csrf.js'

const sectionKey = 'confirmation'
const heading = 'Your animal disease movement licence application'
const urlKey = 'submit-confirmation'
const view = 'common/controller/submit-controller/index'
const pageUrl = '/fmd/submit/confirmation'

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
    // await session.setSectionState('origin', origin)
  })

  it('should be able to access the fmd confirmation page', async () => {
    await session.setState(`fmd-applicationReference`, 'TB-EXAM-PLE!')

    await session.setState('fmd-confirmation-details', {
      reference: 'TB-EXAM-PLE!',
      'state-key': 'fmd-application'
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

    expect(statusCode).toBe(200)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })
})
