import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, destinationAddressKnownPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { DestinationBusinessAddressPage } from '../destination-business-address/index.js'
import { DestinationHasACphNumberPage } from '../destination-has-a-cph-number/index.js'

const sectionKey = 'destination'
const questionKey = 'destinationAddressKnown'
const pageUrl = '/fmd/movement-destination/business-address-yes-no'
const page = destinationAddressKnownPage
const question = 'Do you know the address of the destination premises?'

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

  it('should have the correct validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if you know the address for the destination business'
    )
  })
})

describe('DestinationAddressKnownPage', () => {
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
      ['yes', DestinationBusinessAddressPage],
      ['no', DestinationHasACphNumberPage]
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
