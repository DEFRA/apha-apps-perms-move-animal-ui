import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, destinationContactNumberPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'disposal'
const questionKey = 'destinationContactNumber'
const pageUrl = '/fmd/disposal-of-animals/destination-contact-number'
const page = destinationContactNumberPage
const question =
  'What is the contact phone number for the destination business?'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Text input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the correct validation messages', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      "Enter the destination's contact number"
    )
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })
})

describe('DestinationContactNumberPage', () => {
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
    it('should return checkAnswersPage for any value', () => {
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
