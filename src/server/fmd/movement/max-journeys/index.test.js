import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, maxJourneysPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { MovementStartPage } from '../movement-start/index.js'

const sectionKey = 'movement'
const questionKey = 'maxJourneys'
const pageUrl = '/fmd/movement-details/number-of-journeys'
const page = maxJourneysPage
const question =
  'What are the maximum number of journeys or consignments needed to move the animals?'

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

  describe('config validation options', () => {
    it('should have character width of 10', () => {
      expect(Answer.config.characterWidth).toBe(10)
    })

    it('should have empty validation message', () => {
      expect(Answer.config.validation.empty).toEqual({
        message:
          'Enter the maximum of journeys or consignments needed to move the animals'
      })
    })

    it('should not have min validation', () => {
      expect(Answer.config.validation.min).toBeUndefined()
    })

    it('should not have max validation', () => {
      expect(Answer.config.validation.max).toBeUndefined()
    })
  })

  describe('validation', () => {
    it('should validate successfully with valid number', () => {
      const answer = new Answer({ [questionKey]: '5' })
      const result = answer.validate()
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should fail validation when empty', () => {
      const answer = new Answer({ [questionKey]: '' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors[questionKey].text).toBe(
        'Enter the maximum of journeys or consignments needed to move the animals'
      )
    })

    it('should fail validation with non-numeric input', () => {
      const answer = new Answer({ [questionKey]: 'abc' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors[questionKey].text).toBe('Enter a number')
    })

    it('should fail validation with decimal number', () => {
      const answer = new Answer({ [questionKey]: '5.5' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors[questionKey].text).toBe('Enter a whole number')
    })

    it('should validate successfully with zero', () => {
      const answer = new Answer({ [questionKey]: '0' })
      const result = answer.validate()
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should validate successfully with negative number', () => {
      const answer = new Answer({ [questionKey]: '-1' })
      const result = answer.validate()
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })
  })
})

describe('MaxJourneysPage', () => {
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
    it('should return MovementStartPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MovementStartPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
