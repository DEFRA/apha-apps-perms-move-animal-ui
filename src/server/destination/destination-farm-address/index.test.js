import { AddressAnswer } from '../../common/model/answer/address/address.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'
import { destinationSummaryPage } from '../summary/index.js'
import {
  destinationFarmAddressPage,
  DestinationFarmAddressPage
} from './index.js'

const sectionKey = 'destination'
const question =
  'What is the address of the farm or premises where the animals are going to?'
const questionKey = 'destinationFarmAddress'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/destination-farm-address'

describe('DestinationFarmAddressPage', () => {
  let page

  beforeEach(() => {
    page = new DestinationFarmAddressPage()
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(AddressAnswer)
  })

  it('should export page', () => {
    expect(destinationFarmAddressPage).toBeInstanceOf(
      DestinationFarmAddressPage
    )
  })

  describe('DestinationFarmAddressPage.nextPage', () => {
    describe('off the farm', () => {
      const context = { origin: { onOffFarm: 'off' } }

      it('should return summary page', () => {
        const nextPage = page.nextPage(null, context)
        expect(nextPage).toBe(destinationSummaryPage)
      })

      describePageSnapshot({
        describes: 'DestinationFarmAddressPage.content',
        it: 'should render expected response and content',
        pageUrl,
        state: context
      })
    })

    describe('on the farm', () => {
      const context = { origin: { onOffFarm: 'on' } }

      it('should reason for movement page', () => {
        const nextPage = page.nextPage(null, context)
        expect(nextPage).toBe(reasonForMovementPage)
      })

      describePageSnapshot({
        describes: 'DestinationFarmAddressPage.content',
        it: 'should render expected response and content',
        pageUrl,
        state: context
      })
    })
  })
})
