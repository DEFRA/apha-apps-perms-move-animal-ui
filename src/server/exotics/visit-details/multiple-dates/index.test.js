import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, multipleDatesPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'visitDetails'
const questionKey = 'multipleDates'
const pageUrl = '/exotics/visit-details/multiple-dates'
const page = multipleDatesPage
const question =
  'What are the dates for when you expect the visits to take place?'

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

  it('should have the validation key', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the dates when you expect the visits to take place'
    )
    expect(Answer.config.validation.maxLength).toStrictEqual({
      value: 5_000,
      message: 'Your answer must be no longer than 5000 characters'
    })
  })

  it('should have 4 rows', () => {
    expect(Answer.config.rows).toBe(4)
  })

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })
})

describe('MultipleDatesPage', () => {
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
