import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, productLocationHasACphNumberPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { ProductLocationCphNumberPage } from '../product-location-cph-number/index.js'
import { OriginAddressPage } from '../origin-address/index.js'

const sectionKey = 'origin'
const questionKey = 'productLocationHasACphNumber'
const pageUrl = '/exotics/movement-origin/product-location/cph-yes-no'
const page = productLocationHasACphNumberPage
const question =
  'Does the origin premises have a county parish holding (CPH) number?'

const payload = {
  [questionKey]: 'yes'
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
      'Select if the origin premises has a CPH number'
    )
  })
})

describe('ProductLocationHasACphNumberPage', () => {
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
      ['yes', ProductLocationCphNumberPage],
      ['no', OriginAddressPage]
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
