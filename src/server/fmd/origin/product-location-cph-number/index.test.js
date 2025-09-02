import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { productLocationCphNumberPage } from './index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'
import { AddressPage } from '../address/index.js'

const sectionKey = 'origin'
const questionKey = 'productLocationCphNumber'
const pageUrl = '/fmd/movement-origin/product-location/cph-number'
const page = productLocationCphNumberPage
const question = 'What is the CPH number for the origin premises?'

describe('ProductLocationCphNumberPage', () => {
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
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  describe('nextPage', () => {
    it('should return originAddressPage for any value', () => {
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
