import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, slaughteredNumberPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { AnimalIdsSlaughterPage } from '../animal-ids-slaughter/index.js'

const sectionKey = 'about'
const questionKey = 'slaughteredNumber'
const pageUrl =
  '/fmd/about-the-movement-or-activity/number-of-animals-slaughtered'
const page = slaughteredNumberPage
const question = 'How many animals will be slaughtered?'

const payload = {
  [questionKey]: 123
}

describe('Answer', () => {
  it('should be a Number input', () => {
    expect(new Answer(payload)).toBeInstanceOf(NumberAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter how many animals will be slaughtered'
    )
  })

  it('should define the right minimum value and its error message', () => {
    expect(Answer.config.validation.min?.value).toBe(1)
    expect(Answer.config.validation.min?.message).toBe(
      'Enter a number 1 or above'
    )
  })

  it('should define the right maximum value and its error message', () => {
    expect(Answer.config.validation.max?.value).toBe(5000)
    expect(Answer.config.validation.max?.message).toBe(
      'Enter a number 5000 or below'
    )
  })
})

describe('SlaughteredNumberPage', () => {
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
    it('should return animalIdsSlaughterPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(AnimalIdsSlaughterPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
