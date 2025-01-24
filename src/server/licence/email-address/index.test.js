import { emailAddress, emailAddressPage, EmailAddressPage } from './index.js'
import { licenceSummaryPage } from '../check-answers/index.js'
import { EmailAddressAnswer } from '../../common/model/answer/email/email-address.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'licence'
const question = 'What email address would you like the licence sent to?'
const questionKey = 'emailAddress'
const view = 'licence/email-address/index'
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

  it('should export emailAddress as a plugin', () => {
    expect(emailAddress).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      emailAddress.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    describes: 'EmailAddressPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
