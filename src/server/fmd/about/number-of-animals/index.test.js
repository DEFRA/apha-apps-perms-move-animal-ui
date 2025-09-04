import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, numberOfAnimalsPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { AnimalIdsPage } from '../animal-ids/index.js'

const sectionKey = 'about'
const questionKey = 'numberOfAnimals'
const pageUrl = '/fmd/about-the-movement-or-activity/number-of-animals'
const page = numberOfAnimalsPage
const question = 'How many animals are you planning to move?'

const payload = {
  [questionKey]: 'some text'
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
      'Enter how many animals you are planning to move'
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

describe('NumberOfAnimalsPage', () => {
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
    it('should return animalIdsPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(AnimalIdsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
