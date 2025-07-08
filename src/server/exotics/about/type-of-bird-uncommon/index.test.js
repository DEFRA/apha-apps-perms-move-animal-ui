import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfBirdUncommonPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { NumberOfAnimalsPage } from '../number-of-animals/index.js'
import { TypeOfBirdOtherPage } from '../type-of-bird-other/index.js'

const sectionKey = 'about'
const questionKey = 'typeOfBirdUncommon'
const pageUrl =
  '/exotics/about-the-movement/what-is-moving/select-animals/birds/other-birds'
const page = typeOfBirdUncommonPage
const question = 'What type of bird are you moving?'

const payload = {
  [questionKey]: 'other'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select what type of bird you are moving'
    )
  })

  it('should have the correct options', () => {
    expect(Answer.config.options['avairy-birds'].label).toBe(
      'Birds in large enclosures (aviary birds)'
    )
    expect(Answer.config.options.pheasant.label).toBe('Pheasant')
    expect(Answer.config.options.partridge.label).toBe('Partridge')
    expect(Answer.config.options.quail.label).toBe('Quail')
    expect(Answer.config.options.grouse.label).toBe('Grouse')
    expect(Answer.config.options.other.label).toBe('Another type of bird')
  })
})

describe('TypeOfBirdUncommonPage', () => {
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
      ['avairy-birds', NumberOfAnimalsPage],
      ['pheasant', NumberOfAnimalsPage],
      ['partridge', NumberOfAnimalsPage],
      ['quail', NumberOfAnimalsPage],
      ['grouse', NumberOfAnimalsPage],
      ['other', TypeOfBirdOtherPage]
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
