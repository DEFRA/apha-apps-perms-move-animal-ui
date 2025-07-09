import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { addressPage } from './index.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { InRpaRegisteredFieldPage } from '../in-rpa-registered-field/index.js'
import { AnimalsOnsitePage } from '../animals-onsite/index.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'address'
const pageUrl = '/exotics/location-of-visit/address'
const page = addressPage
const question = 'What is the address of where the visit will take place?'

const validAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco Bay',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}

describe('AddressPage', () => {
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
    it('should return InRpaRegisteredFieldPage for any value', () => {
      const answer = new page.Answer(validAddress)
      const nextPage = page.nextPage(answer, {
        typeOfLocation: 'domestic-residence'
      })
      expect(nextPage).toBeInstanceOf(InRpaRegisteredFieldPage)
    })

    it('should return AnimalsOnsitePage for any value', () => {
      const answer = new page.Answer(validAddress)
      const nextPage = page.nextPage(answer, {
        typeOfLocation: 'other'
      })
      expect(nextPage).toBeInstanceOf(AnimalsOnsitePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
