import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, milkAnimalPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'about'
const questionKey = 'milkAnimal'
const pageUrl = '/fmd/about-the-movement-or-activity/animal-the-milk-is-from'
const page = milkAnimalPage
const question = 'What animal is the milk or product from?'

const payload = {
  [questionKey]: 'cow'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right validation', () => {
    expect(Answer.config.validation).toEqual({
      empty: 'Select what animal the milk or product is from'
    })
  })
})

describe('MilkAnimalPage', () => {
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
