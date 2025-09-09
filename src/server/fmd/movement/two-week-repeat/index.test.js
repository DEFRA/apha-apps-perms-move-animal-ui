import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, twoWeekRepeatPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MilkMovementDatePage } from '../milk-movement-date/index.js'
import { ExpectMovementDatePage } from '../expect-movement-date/index.js'

const sectionKey = 'movement'
const questionKey = 'twoWeekRepeat'
const pageUrl = '/fmd/movement-details/repeat-movement'
const page = twoWeekRepeatPage
const question = 'Will the movement be repeated within a 2 week period?'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have correct empty validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if the movement will be repeated within a 2 week period'
    )
  })
})

describe('TwoWeekRepeatPage', () => {
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
    it.each([
      ['yes', MilkMovementDatePage],
      ['no', ExpectMovementDatePage]
    ])('for %s should return %s', (value, expectedPage) => {
      const answer = new Answer({ [questionKey]: value })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(expectedPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
