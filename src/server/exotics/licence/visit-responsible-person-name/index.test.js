import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { visitResponsiblePersonNamePage } from './index.js'
import { EmailOrPostPage } from '../email-or-post/index.js'
import { LicenceFullNameAnswer } from '../../common/model/answer/licence-full-name/licence-full-name.js'

const sectionKey = 'licence'
const questionKey = 'visitResponsiblePersonName'
const pageUrl = '/exotics/receiving-the-licence/visit/responsible-person-name'
const page = visitResponsiblePersonNamePage
const question =
  'Who is responsible for the premises where the visit is happening?'

describe('VisitResponsiblePersonNamePage', () => {
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
    it('should return EmailOrPostPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(EmailOrPostPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
