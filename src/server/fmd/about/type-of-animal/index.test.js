import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfAnimalPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { TypeOfBirdPage } from '../type-of-bird/index.js'
import { TypeOfAnimalOtherPage } from '../type-of-animal-other/index.js'
import { NumberOfAnimalsPage } from '../number-of-animals/index.js'

const sectionKey = 'about'
const questionKey = 'typeOfAnimal'
const pageUrl = '/fmd/about-the-movement/what-is-moving/select-animals'
const page = typeOfAnimalPage
const question = 'Which type of animal are you moving?'

const payload = {
  [questionKey]: 'cattle'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right error on empty options', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the type of animal you are moving'
    )
  })
})

describe('TypeOfAnimalPage', () => {
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
    it('should return TypeOfBird for birds', () => {
      const answer = new Answer({ [questionKey]: 'birds' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(TypeOfBirdPage)
    })

    it('should return TypeOfAnimalOther for other', () => {
      const answer = new Answer({ [questionKey]: 'other' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(TypeOfAnimalOtherPage)
    })

    it.each([
      ['cattle'],
      ['sheep-and-goats'],
      ['pigs'],
      ['horses'],
      ['camelids']
    ])('should return NumberOfAnimalsPage for %s', (value) => {
      const answer = new Answer({ [questionKey]: value })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(NumberOfAnimalsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
