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
