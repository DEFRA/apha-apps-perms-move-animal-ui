import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, grazingOtherPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { ManureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'

const sectionKey = 'biosecurity'
const questionKey = 'grazingOther'
const pageUrl = '/biosecurity/grazing-field-how-separated-other'
const page = grazingOtherPage
const question =
  'What other measures are being taken to reduce the spread of TB when the animals are grazing?'

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

  it('should have the correct rows configuration', () => {
    expect(Answer.config.rows).toBe(4)
  })

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })

  describe('validation', () => {
    it('should have empty validation message', () => {
      expect(Answer.config.validation.empty?.message).toBe(
        'Enter details on the other measures being taken to reduce the spread of TB when the animals are grazing'
      )
    })

    it('should have maxLength validation with correct value and message', () => {
      expect(Answer.config.validation.maxLength.value).toBe(5000)
      expect(Answer.config.validation.maxLength.message).toBe(
        'Your answer must be no longer than 5000 characters '
      )
    })
  })
})

describe('GrazingOtherPage', () => {
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
    it('should return ManureAndSlurryDetailsPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(ManureAndSlurryDetailsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
