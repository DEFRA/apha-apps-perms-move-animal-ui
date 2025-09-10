import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { destinationBusinessAddressPage } from './index.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { DestinationHasACphNumberPage } from '../destination-has-a-cph-number/index.js'

const sectionKey = 'destination'
const questionKey = 'destinationBusinessAddress'
const pageUrl = '/fmd/movement-destination/destination-business-address'
const page = destinationBusinessAddressPage
const question = 'What is the address of the business removing the carcasses?'

describe('DestinationBusinessAddressPage', () => {
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
    expect(page.Answer).toBe(AddressAnswer)
  })

  describe('nextPage', () => {
    it('should return destinationHasACphNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(DestinationHasACphNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
