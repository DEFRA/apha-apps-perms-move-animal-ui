import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, maximumJourneysMilkPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'movement'
const questionKey = 'maximumJourneysMilk'
const pageUrl = '/fmd/movement-details/maximum-journeys'
const page = maximumJourneysMilkPage
const question =
  'What are the maximum number of journeys needed to move the milk over the 2 week period?'

const payload = {
  [questionKey]: 9
}

describe('Answer', () => {
  it('should be a Number input', () => {
    expect(new Answer(payload)).toBeInstanceOf(NumberAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  describe('config validation', () => {
    it('should have correct empty validation message', () => {
      expect(Answer.config.validation.empty?.message).toBe(
        'Enter the maximum number of journeys needed to move the milk in the 2 week period'
      )
    })

    it('should have correct min validation message', () => {
      expect(Answer.config.validation.min?.message).toBe(
        'The number of journeys needed to move the milk within a 2 week period must be 1 or higher.'
      )
    })

    it('should have correct min validation value', () => {
      expect(Answer.config.validation.min?.value).toBe(1)
    })

    it('should have correct max validation message', () => {
      expect(Answer.config.validation.max?.message).toBe(
        'The number of journeys needed to move the milk within a 2 week period must be 999 or lower.'
      )
    })

    it('should have correct max validation value', () => {
      expect(Answer.config.validation.max?.value).toBe(999)
    })

    it('should have characterWidth set to 10', () => {
      expect(Answer.config.characterWidth).toBe(10)
    })
  })
})

describe('MaximumJourneysPage', () => {
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
