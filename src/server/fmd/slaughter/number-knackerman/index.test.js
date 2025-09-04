import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, numberKnackermanPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { SlaughterStubPage } from '../slaughter-stub/index.js'

const sectionKey = 'slaughter'
const questionKey = 'numberKnackerman'
const pageUrl = '/fmd/slaughter-information/knackerman-contact-number'
const page = numberKnackermanPage
const question =
  'What is the contact phone number for the business providing the Knackerman?'

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

  it('should have the correct character width', () => {
    expect(Answer.config.characterWidth).toBe(10)
  })

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })

  it('should have the correct validation rules', () => {
    expect(Answer.config.validation).toBeDefined()
    expect(Answer.config.validation?.empty?.message).toBe(
      'Enter the contact phone number for the business providing the Knackerman'
    )
    expect(Answer.config.validation?.maxLength?.value).toBe(100)
    expect(Answer.config.validation?.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })
})

describe('NumberKnackermanPage', () => {
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
    it('should return SlaughterStubPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(SlaughterStubPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
