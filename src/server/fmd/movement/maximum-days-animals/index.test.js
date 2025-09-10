import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, maximumDaysAnimalsPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { MaxJourneysPage } from '../max-journeys/index.js'

const sectionKey = 'movement'
const questionKey = 'maximumDaysAnimals'
const pageUrl = '/fmd/movement-details/number-of-days'
const page = maximumDaysAnimalsPage
const question =
  'What are the maximum number of days needed to move the animals?'

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

  it('should have the correct character width', () => {
    expect(Answer.config.characterWidth).toBe(10)
  })

  it('should have the correct validation error message for empty', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the maximum number of days needed to move the animals'
    )
  })

  it('should have correct whole number required message', () => {
    expect(Answer.config.validation.wholeNumberRequired?.message).toBe(
      'The maximum number of days needed to move the animals must be a whole number'
    )
  })

  it('should have correct min validation message', () => {
    expect(Answer.config.validation.min?.message).toBe(
      'The maximum number of days needed to move the animals must be 1 or higher'
    )
  })

  it('should have correct min validation value', () => {
    expect(Answer.config.validation.min?.value).toBe(1)
  })

  it('should have correct max validation message', () => {
    expect(Answer.config.validation.max?.message).toBe(
      'The number of journeys needed to move the animals within a 2 week period must be 999 days or lower'
    )
  })

  it('should have correct max validation value', () => {
    expect(Answer.config.validation.max?.value).toBe(999)
  })
})

describe('MaximumDaysAnimalsPage', () => {
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
    it('should return MaxJourneysPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MaxJourneysPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
