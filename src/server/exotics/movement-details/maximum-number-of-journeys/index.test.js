import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, maximumNumberOfJourneysPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { DatePage } from '../date/index.js'
import { IsDurationMoreThanOneDayPage } from '../is-duration-more-than-one-day/index.js'

const sectionKey = 'movementDetails'
const questionKey = 'maximumNumberOfJourneys'
const pageUrl = '/exotics/movement-details/maximum-number-of-journeys'
const page = maximumNumberOfJourneysPage
const question =
  'What is the maximum number of journeys you need to move the animals? '

const payloadOne = {
  [questionKey]: '1'
}
const payloadGreaterThanOne = {
  [questionKey]: '2'
}

const min = 1
const max = 1000

describe('Answer', () => {
  it('should be a Number input', () => {
    expect(new Answer(payloadOne)).toBeInstanceOf(NumberAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the maximum number of journeys you need to move the animals'
    )
  })

  it('should define the right minimum value and its error message', () => {
    expect(Answer.config.validation.min?.value).toBe(min)
    expect(Answer.config.validation.min?.message).toBe(
      `Enter a number ${min} or above`
    )
  })

  it('should define the right maximum value and its error message', () => {
    expect(Answer.config.validation.max?.value).toBe(max)
    expect(Answer.config.validation.max?.message).toBe(
      `Enter a number ${max} or below`
    )
  })
})

describe('MaximumNumberOfJourneysPage', () => {
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
    it('should return datePage if value provided is 1', () => {
      const answer = new Answer(payloadOne)
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(DatePage)
    })

    it('should return isDurationMoreThanOneDayPage if value provided is greater than 1', () => {
      const answer = new Answer(payloadGreaterThanOne)
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(IsDurationMoreThanOneDayPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
