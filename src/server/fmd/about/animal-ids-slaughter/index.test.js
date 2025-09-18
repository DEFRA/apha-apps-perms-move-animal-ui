import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, animalIdsSlaughterPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'about'
const questionKey = 'animalIdsSlaughter'
const pageUrl = '/fmd/about-the-movement-or-activity/ID-number-slaughter'
const page = animalIdsSlaughterPage
const question =
  'What are the identification (ID) numbers for the animals being slaughtered?'

const maxLength = 5000

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Text area input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(Answer.config.validation.maxLength.value).toBe(maxLength)
    expect(Answer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should not specify an empty validation message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      `Enter the animal ID numbers or N/A if there aren't any`
    )
  })
})

describe('AnimalIdsSlaughterPage', () => {
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
    it('should return checkAnswersPage for any value', () => {
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
