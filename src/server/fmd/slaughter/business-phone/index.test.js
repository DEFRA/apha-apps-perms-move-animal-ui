import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, businessPhonePage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { SlaughterDatePage } from '../slaughter-date/index.js'

const sectionKey = 'slaughter'
const questionKey = 'businessPhone'
const pageUrl = '/fmd/slaughter-information/slaughterman-contact-number'
const page = businessPhonePage
const question =
  'What is the contact phone number for the business providing the Slaughterman?'

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
    expect(Answer.config.characterWidth).toBe(20)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation?.empty?.message).toBe(
      'Enter the contact phone number for the business providing the Slaughterman'
    )
  })

  it('should have validation for max length', () => {
    expect(Answer.config.validation?.maxLength?.value).toBe(100)
    expect(Answer.config.validation?.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })

  it('should not use spellcheck', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })
})

describe('BusinessPhonePage', () => {
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
    it('should return SlaughterDatePage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(SlaughterDatePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
