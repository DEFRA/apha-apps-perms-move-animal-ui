import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, destinationBusinessNamePage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { DestinationContactNumberPage } from '../destination-contact-number/index.js'

const sectionKey = 'disposal'
const questionKey = 'destinationBusinessName'
const pageUrl = '/fmd/disposal-of-animals/destination-business-name'
const page = destinationBusinessNamePage
const question = 'What is the destination’s business name?'

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
      "Enter the destination's business name"
    )
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })
})

describe('DestinationBusinessNamePage', () => {
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
    it('should return destinationContactNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(DestinationContactNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
