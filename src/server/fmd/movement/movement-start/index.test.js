import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, movementStartPage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { MovementEndPage } from '../movement-end/index.js'

const sectionKey = 'movement'
const questionKey = 'movementStart'
const pageUrl = '/fmd/movement-details/start-date'
const page = movementStartPage
const question = 'What date does your movement start?'

const payload = {
  day: '01',
  month: '01',
  year: '2035'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  it('should not be page heading', () => {
    expect(Answer.config.isPageHeading).toBe(false)
  })

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
      message: 'Movement start date must include a day'
    })
  })

  it('should have missing month validation message', () => {
    expect(Answer.config.validation.missingMonth).toEqual({
      message: 'Movement start date must include a month'
    })
  })

  it('should have missing year validation message', () => {
    expect(Answer.config.validation.missingYear).toEqual({
      message: 'Movement start date must include a year'
    })
  })

  it('should have invalid day validation message', () => {
    expect(Answer.config.validation.invalidDay).toEqual({
      message: 'Movement start date must be a real date'
    })
  })

  it('should have invalid month validation message', () => {
    expect(Answer.config.validation.invalidMonth).toEqual({
      message: 'Movement start date must be a real date'
    })
  })

  it('should have invalid year validation message', () => {
    expect(Answer.config.validation.invalidYear).toEqual({
      message: 'Movement start year must be a real date'
    })
  })

  it('should have non four digit year validation message', () => {
    expect(Answer.config.validation.nonFourDigitYear).toEqual({
      message: 'Year must include 4 numbers'
    })
  })

  it('should have invalid date validation message', () => {
    expect(Answer.config.validation.invalidDate).toEqual({
      message: 'Movement start date must be a real date'
    })
  })

  it('should have past date validation message', () => {
    expect(Answer.config.validation.pastDate).toEqual({
      message: 'Movement start date must be in the future'
    })
  })

  it('should not have future date validation', () => {
    expect(Answer.config.validation.futureDate).toBeUndefined()
  })
})

describe('MovementStartPage', () => {
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
    it('should return MovementEndPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MovementEndPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
