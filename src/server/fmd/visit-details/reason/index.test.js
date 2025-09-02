import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, reasonPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { IsDurationMoreThanOneDayPage } from '../is-duration-more-than-one-day/index.js'

const sectionKey = 'visitDetails'
const questionKey = 'reason'
const pageUrl = '/fmd/visit-details/reason'
const page = reasonPage
const question = 'What is the reason for the visit?'

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

  it('should have the right validation', () => {
    expect(Answer.config.validation.maxLength.value).toBe(5_000)
    expect(Answer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the reason for the visit'
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
    it('should return IsDurationMoreThanOneDayPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(IsDurationMoreThanOneDayPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
