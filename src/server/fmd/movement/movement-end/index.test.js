import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, movementEndPage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'movement'
const questionKey = 'movementEnd'
const pageUrl = '/fmd/movement-details/end-date'
const page = movementEndPage
const question = 'What date does your movement end?'

const payload = {
  day: '01',
  month: '01',
  year: '2035'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  describe('config validation options', () => {
    it('should have hint text', () => {
      expect(Answer.config.hint).toBe('For example, 7 3 2025')
    })

    it('should have missing date validation message', () => {
      expect(Answer.config.validation.missingDate).toEqual({
        message: 'Enter the movement start date'
      })
    })

    it('should have missing day validation message', () => {
      expect(Answer.config.validation.missingDay).toEqual({
        message: 'Movement end date must include a day'
      })
    })

    it('should have missing month validation message', () => {
      expect(Answer.config.validation.missingMonth).toEqual({
        message: 'Movement end date must include a month'
      })
    })

    it('should have missing year validation message', () => {
      expect(Answer.config.validation.missingYear).toEqual({
        message: 'Movement end date must include a year'
      })
    })

    it('should have invalid day validation message', () => {
      expect(Answer.config.validation.invalidDay).toEqual({
        message: 'Movement end day must be a real date'
      })
    })

    it('should have invalid month validation message', () => {
      expect(Answer.config.validation.invalidMonth).toEqual({
        message: 'Movement end month must be a number between 1 and 12'
      })
    })

    it('should have invalid year validation message', () => {
      expect(Answer.config.validation.invalidYear).toEqual({
        message: 'Movement end year must be a real date'
      })
    })

    it('should have non four digit year validation message', () => {
      expect(Answer.config.validation.nonFourDigitYear).toEqual({
        message: 'Movement end year must include 4 numbers'
      })
    })

    it('should have invalid date validation message', () => {
      expect(Answer.config.validation.invalidDate).toEqual({
        message: 'Movement end date must be a real date'
      })
    })

    it('should have past date validation message', () => {
      expect(Answer.config.validation.pastDate).toEqual({
        message: 'Movement end date must be in the future'
      })
    })

    it('should not have future date validation', () => {
      expect(Answer.config.validation.futureDate).toBeUndefined()
    })

    it('should not explicitly set isPageHeading (defaults to true)', () => {
      expect(Answer.config.isPageHeading).toBeUndefined()
    })
  })

  describe('validation', () => {
    it('should validate successfully with valid future date', () => {
      const answer = new Answer({ day: '15', month: '12', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should fail validation when completely empty', () => {
      const answer = new Answer(undefined)
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Enter the movement start date'
      )
    })

    it('should fail validation when all fields are empty strings', () => {
      const answer = new Answer({ day: '', month: '', year: '' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Enter the movement start date'
      )
    })

    it('should fail validation when day is missing', () => {
      const answer = new Answer({ day: '', month: '12', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Movement end date must include a day'
      )
    })

    it('should fail validation when month is missing', () => {
      const answer = new Answer({ day: '15', month: '', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-month'].text).toBe(
        'Movement end date must include a month'
      )
    })

    it('should fail validation when year is missing', () => {
      const answer = new Answer({ day: '15', month: '12', year: '' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-year'].text).toBe(
        'Movement end date must include a year'
      )
    })

    it('should fail validation with invalid day (0)', () => {
      const answer = new Answer({ day: '0', month: '12', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Movement end day must be a real date'
      )
    })

    it('should fail validation with invalid day (32)', () => {
      const answer = new Answer({ day: '32', month: '12', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Movement end day must be a real date'
      )
    })

    it('should fail validation with invalid month (0)', () => {
      const answer = new Answer({ day: '15', month: '0', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-month'].text).toBe(
        'Movement end month must be a number between 1 and 12'
      )
    })

    it('should fail validation with invalid month (13)', () => {
      const answer = new Answer({ day: '15', month: '13', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-month'].text).toBe(
        'Movement end month must be a number between 1 and 12'
      )
    })

    it('should fail validation with non-numeric year', () => {
      const answer = new Answer({ day: '15', month: '12', year: 'abc' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-year'].text).toBe(
        'Movement end year must be a real date'
      )
    })

    it('should fail validation with three digit year', () => {
      const answer = new Answer({ day: '15', month: '12', year: '202' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-year'].text).toBe(
        'Movement end year must include 4 numbers'
      )
    })

    it('should fail validation with invalid date (29 Feb on non-leap year)', () => {
      const answer = new Answer({ day: '29', month: '2', year: '2025' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Movement end date must be a real date'
      )
    })

    it('should fail validation with past date', () => {
      const answer = new Answer({ day: '1', month: '1', year: '2020' })
      const result = answer.validate()
      expect(result.isValid).toBe(false)
      expect(result.errors['date-day'].text).toBe(
        'Movement end date must be in the future'
      )
    })

    it('should validate successfully with leap year date', () => {
      const answer = new Answer({ day: '29', month: '2', year: '2028' })
      const result = answer.validate()
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })
  })
})

describe('MovementEndPage', () => {
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
