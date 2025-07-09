import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, animalLocationCphNumberPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { AddressPage } from '../address/index.js'

const sectionKey = 'origin'
const questionKey = 'animalLocationCphNumber'
const pageUrl = '/exotics/movement-origin/animal-location/cph-number'
const page = animalLocationCphNumberPage
const question = 'What is the CPH number for the origin premises?'

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

  it('should have the correct hint', () => {
    expect(Answer.config.hint).toBe('For example, 12/345/6789')
  })

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })

  it('should have character width of 10', () => {
    expect(Answer.config.characterWidth).toBe(10)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the CPH number for the origin premises'
    )
  })

  it('should have validation for maximum length', () => {
    expect(Answer.config.validation.maxLength?.value).toBe(11)
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })

  it('should have validation pattern for CPH format', () => {
    expect(Answer.config.validation.pattern?.regex).toEqual(
      /^(\d{2})\/(\d{3})\/(\d{4})$/i
    )
    expect(Answer.config.validation.pattern?.message).toBe(
      'Enter the CPH number in the correct format, for example, 12/345/6789'
    )
  })
})

describe('AnimalLocationCphNumberPage', () => {
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
    it('should return AddressPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(AddressPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
