import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfBirdPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { NumberOfAnimalsPage } from '../number-of-animals/index.js'
import { TypeOfBirdUncommonPage } from '../type-of-bird-uncommon/index.js'

const sectionKey = 'about'
const questionKey = 'typeOfBird'
const pageUrl =
  '/exotics/about-the-movement/what-is-moving/select-animals/birds'
const page = typeOfBirdPage
const question = 'What type of bird are you moving?'

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

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select what type of bird you are moving'
    )
  })

  it('should have the correct options', () => {
    expect(Answer.config.options.chickens.label).toBe('Chickens')
    expect(Answer.config.options.turkeys.label).toBe('Turkeys')
    expect(Answer.config.options.ducks.label).toBe('Ducks')
    expect(Answer.config.options.geese.label).toBe('Geese')
    expect(Answer.config.options['birds-of-prey'].label).toBe('Birds of prey')
    expect(Answer.config.options['racing-pigeons'].label).toBe('Racing pigeons')
    expect(Answer.config.options.other.label).toBe('Another type of bird')
  })
})

describe('TypeOfBirdPage', () => {
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
      ['chickens', NumberOfAnimalsPage],
      ['turkeys', NumberOfAnimalsPage],
      ['ducks', NumberOfAnimalsPage],
      ['geese', NumberOfAnimalsPage],
      ['birds-of-prey', NumberOfAnimalsPage],
      ['racing-pigeons', NumberOfAnimalsPage],
      ['other', TypeOfBirdUncommonPage]
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
