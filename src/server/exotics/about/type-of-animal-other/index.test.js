import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfAnimalOtherPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { NumberOfAnimalsPage } from '../number-of-animals/index.js'

const sectionKey = 'about'
const questionKey = 'typeOfAnimalOther'
const pageUrl =
  '/exotics/about-the-movement/what-is-moving/select-animals/other'
const page = typeOfAnimalOtherPage
const question = 'What type of species you are moving?'

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

  it('should have spellcheck not to be set to false', () => {
    expect(Answer.config.spellcheck).not.toBe(false)
  })

  it('should have stripWhitespace true', () => {
    expect(Answer.config.stripWhitespace).toBe(true)
  })

  it('should have a characterWidth of 20', () => {
    expect(Answer.config.characterWidth).toBe(20)
  })

  it('should have an empty error message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the species type you are moving'
    )
  })

  it('should have a 100 character limit with the right message', () => {
    expect(Answer.config.validation.maxLength).toStrictEqual({
      value: 100,
      message: 'Your answer must be no longer than 100 characters'
    })
  })
})

describe('TypeOfAnimalOtherPage', () => {
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
    it('should return NumberOfAnimalsPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(NumberOfAnimalsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
