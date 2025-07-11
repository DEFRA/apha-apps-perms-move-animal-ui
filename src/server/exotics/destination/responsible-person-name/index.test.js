import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, responsiblePersonNamePage } from './index.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'destination'
const questionKey = 'responsiblePersonName'
const pageUrl = '/exotics/movement-destination/responsible-person-name'
const page = responsiblePersonNamePage
const question = 'Who is responsible for the destination premises?'

const payload = {
  firstName: 'first name',
  lastName: 'last name'
}

describe('Answer', () => {
  it('should be a Full name input', () => {
    expect(new Answer(payload)).toBeInstanceOf(FullNameAnswer)
  })

  it('should have the right validation', () => {
    expect(Answer.config.validation.firstName.empty?.message).toBe(
      'Enter a first name'
    )

    expect(Answer.config.validation.lastName.empty?.message).toBe(
      'Enter a last name'
    )
  })
})

describe('ResponsiblePersonNamePage', () => {
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
