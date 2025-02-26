import { quantityHalfHerdPage, QuantityHalfHerdPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { destinationSummaryPage } from '../summary/index.js'
import { QuantityHalfHerdAnswer } from '../../common/model/answer/quantity-half-herd/quantity-half-herd.js'

const sectionKey = 'destination'
const question =
  'Will the number of cattle be larger than half of the destination herd size?'
const questionKey = 'quantityHalfHerd'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/quantity-half-herd'

describe('QuantityHalfHerdPage', () => {
  let page

  beforeEach(() => {
    page = new QuantityHalfHerdPage()
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
    expect(page.Answer).toBe(QuantityHalfHerdAnswer)
  })

  it('nextPage should return destination summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(destinationSummaryPage)
  })

  it('should export page', () => {
    expect(quantityHalfHerdPage).toBeInstanceOf(QuantityHalfHerdPage)
  })

  describePageSnapshot({
    describes: 'QuantityHalfHerdPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
