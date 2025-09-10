import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, maxJourneysPage } from './index.js'
import { NumberAnswer } from '~/src/server/common/model/answer/number/number.js'
import { MovementStartPage } from '../movement-start/index.js'

const sectionKey = 'movement'
const questionKey = 'maxJourneys'
const pageUrl = '/fmd/movement-details/number-of-journeys'
const page = maxJourneysPage
const question =
  'What are the maximum number of journeys or consignments needed to move the animals?'

const payload = {
  [questionKey]: 8
}

describe('Answer', () => {
  it('should be a Number input', () => {
    expect(new Answer(payload)).toBeInstanceOf(NumberAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have character width of 10', () => {
    expect(Answer.config.characterWidth).toBe(10)
  })

  it('should have empty validation message', () => {
    expect(Answer.config.validation.empty).toEqual({
      message:
        'Enter the maximum of journeys or consignments needed to move the animals'
    })
  })

  it('should have min validation', () => {
    expect(Answer.config.validation.min).toEqual({
      value: 1,
      message:
        'The number of journeys or consignments needed to move the animals must be 1 or more'
    })
  })

  it('should have max validation', () => {
    expect(Answer.config.validation.max).toEqual({
      value: 999,
      message:
        'The number of journeys or consignments needed to move the animals must be 999 or lower'
    })
  })
})

describe('MaxJourneysPage', () => {
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
    it('should return MovementStartPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MovementStartPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
