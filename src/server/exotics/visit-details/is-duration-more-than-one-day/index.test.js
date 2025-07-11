import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, isDurationMoreThanOneDayPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MultipleDatesPage } from '../multiple-dates/index.js'
import { DatePage } from '../date/index.js'

const sectionKey = 'visitDetails'
const questionKey = 'isDurationMoreThanOneDay'
const pageUrl = '/exotics/visit-details/duration-more-than-one-day'
const page = isDurationMoreThanOneDayPage
const question = 'Will the visit take more than 1 day? '

const payload = {
  [questionKey]: 'yes'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right validation key', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if the visit will take more than 1 day'
    )
  })
})

describe('IsDurationMoreThanOneDayPage', () => {
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
    it.each([
      ['yes', MultipleDatesPage],
      ['no', DatePage]
    ])('for %s should return %s', (value, expectedPage) => {
      const answer = new Answer({ [questionKey]: value })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(expectedPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
