import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { originResponsiblePersonNamePage } from './index.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'
import { EmailPage } from '../email/index.js'

const sectionKey = 'licence'
const questionKey = 'originResponsiblePersonName'
const pageUrl = '/exotics/receiving-the-licence/origin/responsible-person-name'
const page = originResponsiblePersonNamePage
const question = 'Who is responsible for the origin premises?'

describe('OriginResponsiblePersonNamePage', () => {
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
    expect(page.Answer).toBe(LicenceFullNameAnswer)
  })

  describe('nextPage', () => {
    it('should return EmailPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(EmailPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
