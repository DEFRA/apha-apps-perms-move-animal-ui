import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { emailAddressPage } from './index.js'
import { CheckAnswersPage } from '../check-answers/index.js'
import { EmailAddressAnswer } from '~/src/server/common/model/answer/email-address/email-address.js'

const sectionKey = 'licence'
const questionKey = 'emailAddress'
const pageUrl = '/fmd/receiving-the-licence/email-address'
const page = emailAddressPage
const question = 'What email address would you like the licence sent to?'

describe('EmailAddressPage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(EmailAddressAnswer)
  })

  describe('nextPage', () => {
    it('should return CheckAnswersPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CheckAnswersPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
