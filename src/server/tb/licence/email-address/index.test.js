import { createServer } from '~/src/server/index.js'
import { emailAddressPage, EmailAddressPage } from './index.js'
import { licenceSummaryPage } from '../check-answers/index.js'
import { EmailAddressAnswer } from '../../../common/model/answer/email/email-address.js'
import { spyOnConfig } from '../../../common/test-helpers/config.js'
import { withCsrfProtection } from '../../../common/test-helpers/csrf.js'
import { parseDocument } from '../../../common/test-helpers/dom.js'
import SessionTestHelper from '../../../common/test-helpers/session-helper.js'

const sectionKey = 'licence'
const question = 'What email address would you like the licence sent to?'
const questionKey = 'emailAddress'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/licence-enter-email-address'

describe('EmailAddressPage', () => {
  let page

  beforeEach(() => {
    page = new EmailAddressPage()
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(EmailAddressAnswer)
  })

  it('nextPage should return licenceCheckAnswersPage', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(licenceSummaryPage)
  })

  it('should export page', () => {
    expect(emailAddressPage).toBeInstanceOf(EmailAddressPage)
  })
})

describe('#hint text turned off', () => {
  let server
  let session

  beforeAll(async () => {
    spyOnConfig('featureFlags', {
      emailConfirmation: false
    })
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)

    // for (const [key, value] of Object.entries(state)) {
    //   await session.setSectionState(key, value)
    // }
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should respond with expected output', async () => {
    const { payload } = await server.inject(
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

    const content =
      parseDocument(payload).querySelector('#main-content')?.innerHTML

    expect(content).toMatchSnapshot()
    expect(content).not.toContain(
      'A confirmation email will also be sent to this email address'
    )
  })
})

describe('#hint text turned on', () => {
  let server
  let session

  beforeAll(async () => {
    spyOnConfig('featureFlags', {
      emailConfirmation: true
    })
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should respond with expected output', async () => {
    const { payload } = await server.inject(
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

    const content =
      parseDocument(payload).querySelector('#main-content')?.innerHTML

    expect(content).toMatchSnapshot()
    expect(content).toContain(
      'A confirmation email will also be sent to this email address'
    )
  })
})
