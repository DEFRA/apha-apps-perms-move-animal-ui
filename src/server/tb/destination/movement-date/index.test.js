import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, movementDatePage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { AdditionalInfoPage } from '../additional-info/index.js'

const sectionKey = 'destination'
const questionKey = 'movementDate'
const pageUrl = '/destination/any-additional-info'
const page = movementDatePage
const question = 'What date will the animals move off the farm or premises?'

const payload = {
  day: '7',
  month: '10',
  year: '2025'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  describe('config', () => {
    it('should have the correct hint', () => {
      expect(Answer.config.hint).toBe('For example, 7 10 2025')
    })

    describe('validation messages', () => {
      it('should have the correct invalidDate message', () => {
        expect(Answer.config.validation.invalidDate.message).toBe(
          'Date the animals will move off the farm or premises must be a real date'
        )
      })

      it('should have the correct missingDate message', () => {
        expect(Answer.config.validation.missingDate.message).toBe(
          'Enter the date the animals will move off the farm or premises'
        )
      })

      it('should have the correct missingDay message', () => {
        expect(Answer.config.validation.missingDay.message).toBe(
          'Date the animals will move off the farm or premises must include a day'
        )
      })

      it('should have the correct missingMonth message', () => {
        expect(Answer.config.validation.missingMonth.message).toBe(
          'Date the animals will move off the farm or premises must include a month'
        )
      })

      it('should have the correct missingYear message', () => {
        expect(Answer.config.validation.missingYear.message).toBe(
          'Date the animals will move off the farm or premises must include a year'
        )
      })

      it('should have the correct invalidDay message', () => {
        expect(Answer.config.validation.invalidDay.message).toBe(
          'Day the animals will move off the farm or premises must be a real date'
        )
      })

      it('should have the correct invalidMonth message', () => {
        expect(Answer.config.validation.invalidMonth.message).toBe(
          'Month the animals will move off the farm or premises must be a number between 1 and 12'
        )
      })

      it('should have the correct invalidYear message', () => {
        expect(Answer.config.validation.invalidYear.message).toBe(
          'Year the animals will move off the farm or premises must be a real date'
        )
      })

      it('should have the correct nonFourDigitYear message', () => {
        expect(Answer.config.validation.nonFourDigitYear.message).toBe(
          'Year the animals will move off the farm or premises must be a real date'
        )
      })

      it('should have the correct pastDate message', () => {
        expect(Answer.config.validation.pastDate?.message).toBe(
          'Date of movement must be today or after'
        )
      })
    })
  })
})

describe('MovementDatePage', () => {
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
    it('should return AdditionalInfoPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(AdditionalInfoPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
