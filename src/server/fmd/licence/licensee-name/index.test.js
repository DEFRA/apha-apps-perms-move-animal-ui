import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, licenseeNamePage } from './index.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { EmailAddressPage } from '../email-address/index.js'

const sectionKey = 'licence'
const questionKey = 'licenseeName'
const pageUrl = '/fmd/receiving-the-licence/licensee-name'
const page = licenseeNamePage
const question = 'Who should we issue the licence to?'

describe('Answer', () => {
  it('should be a Full name input', () => {
    expect(new Answer()).toBeInstanceOf(FullNameAnswer)
  })

  describe('config', () => {
    it('should have the correct validation messages for firstName empty', () => {
      expect(Answer.config.validation.firstName.empty?.message).toBe(
        'Enter the first name of the licensee'
      )
    })

    it('should have the correct validation messages for lastName empty', () => {
      expect(Answer.config.validation.lastName.empty?.message).toBe(
        'Enter the last name of the licensee'
      )
    })
  })
})

describe('LicenceNamePage', () => {
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
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it('should return EmailAddressPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(EmailAddressPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
