import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, numberOfAnimalsPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { CurrentPurposeOfAnimalsPage } from '../current-purpose-of-animals/index.js'

const sectionKey = 'about'
const questionKey = 'numberOfAnimals'
const pageUrl = '/fmd/about-the-movement/what-is-moving/select-animals/quantity'
const page = numberOfAnimalsPage
const question = 'How many animals are you planning to move?'

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

  it('should have the right character width', () => {
    expect(Answer.config.characterWidth).toBe(4)
  })

  it('should have the right validation', () => {
    expect(Answer.config.validation).toEqual({
      empty: {
        message: 'Enter how many animals you are planning to move'
      },
      min: {
        value: 1,
        message: 'Enter a number 1 or above'
      },
      max: {
        value: 1000,
        message: 'Enter a number 1000 or below'
      }
    })
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
    it('should return CurrentPurposeOfAnimalsPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CurrentPurposeOfAnimalsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
