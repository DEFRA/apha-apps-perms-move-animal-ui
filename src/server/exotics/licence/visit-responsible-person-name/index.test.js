import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, visitResponsiblePersonNamePage } from './index.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { EmailOrPostPage } from '../email-or-post/index.js'

const sectionKey = 'licence'
const questionKey = 'visitResponsiblePersonName'
const pageUrl = '/exotics/receiving-the-licence/visit/responsible-person-name'
const page = visitResponsiblePersonNamePage
const question =
  'Who is responsible for the premises where the visit is happening?'

const payload = {
  firstName: 'some first name',
  lastName: 'some surname'
}

describe('Answer', () => {
  it('should be a Full name input', () => {
    expect(new Answer(payload)).toBeInstanceOf(FullNameAnswer)
  })

  it('should have the right validation options', () => {
    expect(Answer.config.validation.firstName.empty?.message).toBe(
      'Enter a first name'
    )
    expect(Answer.config.validation.lastName.empty?.message).toBe(
      'Enter a last name'
    )
  })
})

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
    expect(page.Answer).toBe(Answer)
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
