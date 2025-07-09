import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfAnimalLocationOtherPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { AnimalLocationHasACphNumberPage } from '../animal-location-has-a-cph-number/index.js'

const sectionKey = 'origin'
const questionKey = 'typeOfAnimalLocationOther'
const pageUrl = '/exotics/movement-origin/animal-location/enter-premises-type'
const page = typeOfAnimalLocationOtherPage
const question = 'What type of premises are the animals kept at?'

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

  it('should have character width of 20', () => {
    expect(Answer.config.characterWidth).toBe(20)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the location of where the animals are kept'
    )
  })

  it('should have validation for maximum length', () => {
    expect(Answer.config.validation.maxLength?.value).toBe(100)
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })
})

describe('TypeOfAnimalLocationOtherPage', () => {
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
    it('should return AnimalLocationHasACphNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(AnimalLocationHasACphNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
