import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, milkMovementDatePage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { MaximumJourneysPage } from '../maximum-journeys/index.js'

const sectionKey = 'movement'
const questionKey = 'milkMovementDate'
const pageUrl = '/fmd/movement-details/milk-movement-start-date'
const page = milkMovementDatePage
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

  describe('config validation', () => {
    it('should have correct missingDate validation message', () => {
      expect(Answer.config.validation.missingDate?.message).toBe(
        'Enter the start date of the milk movement'
      )
    })

    it('should have correct missingDay validation message', () => {
      expect(Answer.config.validation.missingDay?.message).toBe(
        'The milk movement start date must include a day'
      )
    })

    it('should have correct missingMonth validation message', () => {
      expect(Answer.config.validation.missingMonth?.message).toBe(
        'The milk movement start date must include a month'
      )
    })

    it('should have correct missingYear validation message', () => {
      expect(Answer.config.validation.missingYear?.message).toBe(
        'The milk movement start date must include a year'
      )
    })

    it('should have correct invalidDay validation message', () => {
      expect(Answer.config.validation.invalidDay?.message).toBe(
        'The milk movement start date must be a real date'
      )
    })

    it('should have correct invalidMonth validation message', () => {
      expect(Answer.config.validation.invalidMonth?.message).toBe(
        'The milk movement start date must be a real date'
      )
    })

    it('should have correct invalidYear validation message', () => {
      expect(Answer.config.validation.invalidYear?.message).toBe(
        'The milk movement start date must be a real date'
      )
    })

    it('should have correct nonFourDigitYear validation message', () => {
      expect(Answer.config.validation.nonFourDigitYear?.message).toBe(
        'The year of milk movement must include 4 numbers'
      )
    })

    it('should have correct invalidDate validation message', () => {
      expect(Answer.config.validation.invalidDate?.message).toBe(
        'The milk movement start date must be a real date'
      )
    })

    it('should have correct pastDate validation message', () => {
      expect(Answer.config.validation.pastDate?.message).toBe(
        'The milk movement start date must be in the future'
      )
    })
  })
})

describe('MilkMovementDatePage', () => {
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
    it('should return MaximumJourneysPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MaximumJourneysPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
