import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, datePage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'movementDetails'
const questionKey = 'date'
const pageUrl = '/fmd/movement-details/date'
const page = datePage
const question = 'When do you expect the movement to happen?'

const payload = {
  day: '04',
  month: '12',
  year: '2025'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  it('should have the right validation', () => {
    const { validation } = Answer.config

    expect(validation.missingDate.message).toBe(
      'Enter the expected movement date'
    )
    expect(validation.missingDay.message).toBe(
      'Expected movement date must include a day'
    )
    expect(validation.missingMonth.message).toBe(
      'Expected movement date must include a month'
    )
    expect(validation.missingYear.message).toBe(
      'Expected movement date must include a year'
    )
    expect(validation.invalidDay.message).toBe(
      'Expected movement day must be a real date'
    )
    expect(validation.invalidMonth.message).toBe(
      'Expected movement month must be a number between 1 and 12'
    )
    expect(validation.invalidYear.message).toBe(
      'Expected movement year must be a real date'
    )
    expect(validation.nonFourDigitYear.message).toBe(
      'Expected movement year must include 4 numbers'
    )
    expect(validation.invalidDate.message).toBe(
      'Expected movement date must be a real date'
    )
  })
})

describe('DatePage', () => {
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
