import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, expectMovementDatePage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'movement'
const questionKey = 'expectMovementDate'
const pageUrl = '/fmd/movement-details/milk-movement-dates'
const page = expectMovementDatePage
const question = 'When is the date when you expect the milk to move?'

const payload = {
  day: '01',
  month: '01',
  year: '2035'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  describe('config', () => {
    it('should have the correct hint', () => {
      expect(Answer.config.hint).toBe('For example, 7 3 2025')
    })

    describe('validation messages', () => {
      it('should have correct missingDate message', () => {
        expect(Answer.config.validation.missingDate.message).toBe(
          'Enter the start date'
        )
      })

      it('should have correct missingDay message', () => {
        expect(Answer.config.validation.missingDay.message).toBe(
          'The milk movement start date must include a day'
        )
      })

      it('should have correct missingMonth message', () => {
        expect(Answer.config.validation.missingMonth.message).toBe(
          'The milk movement start date must include a month'
        )
      })

      it('should have correct missingYear message', () => {
        expect(Answer.config.validation.missingYear.message).toBe(
          'The milk movement start date must include a year'
        )
      })

      it('should have correct invalidDay message', () => {
        expect(Answer.config.validation.invalidDay.message).toBe(
          'The milk movement start date must be a real date'
        )
      })

      it('should have correct invalidMonth message', () => {
        expect(Answer.config.validation.invalidMonth.message).toBe(
          'The milk movement start date must be a real date'
        )
      })

      it('should have correct invalidYear message', () => {
        expect(Answer.config.validation.invalidYear.message).toBe(
          'The milk movement start date must be a real date'
        )
      })

      it('should have correct nonFourDigitYear message', () => {
        expect(Answer.config.validation.nonFourDigitYear.message).toBe(
          'The year of milk movement must include 4 numbers'
        )
      })

      it('should have correct invalidDate message', () => {
        expect(Answer.config.validation.invalidDate.message).toBe(
          'The milk movement start date must be a real date'
        )
      })

      it('should have correct pastDate message', () => {
        expect(Answer.config.validation.pastDate?.message).toBe(
          'The milk movement start date must be in the future'
        )
      })
    })
  })
})

describe('ExpectMovementDatePage', () => {
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
