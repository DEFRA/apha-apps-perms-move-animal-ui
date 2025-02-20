import { importAddressPage, ImportAddressPage } from './index.js'
import { AddressAnswer } from '../../common/model/answer/address/address.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { fiftyPercentWarningPage } from '../fifty-percent-warning/index.js'

const sectionKey = 'origin'
const question = 'What is the address of the UK point of entry?'
const questionKey = 'address'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/import-address'

const addressInput = {
  addressLine1: '123 test street',
  addressTown: 'test town',
  addressPostcode: 'N11AA'
}

const page = new ImportAddressPage()

describe('OriginAddressPage', () => {
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

  it('nextPage should return summaryPage', () => {
    const answer = new AddressAnswer(addressInput)
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(fiftyPercentWarningPage)
  })

  it('should export page', () => {
    expect(importAddressPage).toBeInstanceOf(ImportAddressPage)
  })

  describe('#originAddressPage.content', () => {
    describePageSnapshot({
      describes: 'licenceSummaryPage.content',
      it: 'should render expected response and content',
      pageUrl
    })
  })
})
