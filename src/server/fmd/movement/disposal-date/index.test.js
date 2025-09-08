import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, disposalDatePage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'movement'
const questionKey = 'disposalDate'
const pageUrl = '/fmd/movement-details/disposal-date'
const page = disposalDatePage
const question = 'What date do you expect the disposal to take place?'

const payload = {
  day: '01',
  month: '01',
  year: '2035'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  it('should have the correct isPageHeading setting', () => {
    expect(Answer.config.isPageHeading).toBe(false)
  })

  it('should have the correct hint', () => {
    expect(Answer.config.hint).toBe('For example, 7 3 2025')
  })

  it('should have the correct validation error message for missing date', () => {
    expect(Answer.config.validation.missingDate?.message).toBe(
      'Enter the date you expect the disposal to take place'
    )
  })

  it('should have the correct validation error message for missing day', () => {
    expect(Answer.config.validation.missingDay?.message).toBe(
      'Disposal date must include a day'
    )
  })

  it('should have the correct validation error message for missing month', () => {
    expect(Answer.config.validation.missingMonth?.message).toBe(
      'Disposal date must include a month'
    )
  })

  it('should have the correct validation error message for missing year', () => {
    expect(Answer.config.validation.missingYear?.message).toBe(
      'Disposal date must include a year'
    )
  })

  it('should have the correct validation error message for invalid day', () => {
    expect(Answer.config.validation.invalidDay?.message).toBe(
      'Disposal day must be a real date'
    )
  })

  it('should have the correct validation error message for invalid month', () => {
    expect(Answer.config.validation.invalidMonth?.message).toBe(
      'Disposal month must be a number between 1 and 12'
    )
  })

  it('should have the correct validation error message for invalid year', () => {
    expect(Answer.config.validation.invalidYear?.message).toBe(
      'Disposal year must be a real date'
    )
  })

  it('should have the correct validation error message for non four digit year', () => {
    expect(Answer.config.validation.nonFourDigitYear?.message).toBe(
      'Disposal year must include 4 numbers'
    )
  })

  it('should have the correct validation error message for invalid date', () => {
    expect(Answer.config.validation.invalidDate?.message).toBe(
      'Disposal date must be a real date'
    )
  })

  it('should have the correct validation error message for past date', () => {
    expect(Answer.config.validation.pastDate?.message).toBe(
      'Disposal date must be in the future'
    )
  })
})

describe('DisposalDatePage', () => {
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
