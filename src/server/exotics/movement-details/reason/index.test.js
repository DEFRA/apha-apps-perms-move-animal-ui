import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, reasonPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { FrequencyPage } from '../frequency/index.js'

const sectionKey = 'movementDetails'
const questionKey = 'reason'
const pageUrl = '/exotics/movement-details/reason'
const page = reasonPage
const question = 'What is the reason for the movement?'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Text area input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the reason for the movement'
    )
  })

  it('should have validation for maximum length', () => {
    expect(Answer.config.validation.maxLength.value).toBe(5000)
    expect(Answer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })
})

describe('ReasonPage', () => {
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
    it('should return frequencyPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(FrequencyPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
