import { destinationFarmCphPage, DestinationFarmCphPage } from './index.js'
import { CphNumberAnswer } from '../../common/model/answer/cph-number/cph-number.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { destinationFarmAddressPage } from '../destination-farm-address/index.js'

const sectionKey = 'destination'
const question =
  'What is the County Parish Holding (CPH) number of the farm or premises where the animals are going to?'
const questionKey = 'destinationFarmCph'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/destination-farm-cph'

describe('DestinationFarmCphPage', () => {
  let page

  beforeEach(() => {
    page = new DestinationFarmCphPage()
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
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(destinationFarmAddressPage)
  })

  it('should export page', () => {
    expect(destinationFarmCphPage).toBeInstanceOf(DestinationFarmCphPage)
  })

  describePageSnapshot({
    describes: 'DestinationFarmCphPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
