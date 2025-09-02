import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfProductLocationPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { ProductLocationHasACphNumberPage } from '../product-location-has-a-cph-number/index.js'

const sectionKey = 'origin'
const questionKey = 'typeOfProductLocation'
const pageUrl = '/fmd/movement-origin/product-location'
const page = typeOfProductLocationPage
const question = 'Where are the products located?'

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

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the location of the products'
    )
  })
})

describe('TypeOfProductLocationPage', () => {
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
    it('should return ProductLocationHasACphNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(ProductLocationHasACphNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
