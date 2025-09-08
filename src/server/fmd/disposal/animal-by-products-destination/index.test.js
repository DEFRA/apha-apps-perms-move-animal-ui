import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, animalByProductsDestinationPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { DestinationBusinessNamePage } from '../destination-business-name/index.js'
import { AbpSomewhereElseExitPage } from '../abp-somewhere-else/index.js'

const sectionKey = 'disposal'
const questionKey = 'animalByProductsDestination'
const pageUrl = '/fmd/disposal-of-animals/ABP-premises-type'
const page = animalByProductsDestinationPage
const question = 'Where are the animal by-products going?'

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

  it('should have the right validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select where the animal by-products are going'
    )
  })
})

describe('AnimalByProductsDestinationPage', () => {
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
      ['rendering-plant', DestinationBusinessNamePage],
      ['incinerator', DestinationBusinessNamePage],
      ['somewhere-else', AbpSomewhereElseExitPage]
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
