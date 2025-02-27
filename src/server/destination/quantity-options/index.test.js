import { quantityOptionsPage, QuantityOptionsPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { QuantityOptionsAnswer } from '../../common/model/answer/quantity-options/quantity-options.js'
import { quantityHalfHerdPage } from '../quantity-half-herd/index.js'
import { destinationSummaryPage } from '../summary/index.js'

const sectionKey = 'destination'
const question = 'Will you move more than 75 animals?'
const questionKey = 'movingMoreThan75Animals'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/quantity-options'

describe('QuantityOptionsPage', () => {
  const page = new QuantityOptionsPage()

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
    expect(page.Answer).toBe(QuantityOptionsAnswer)
  })

  it('nextPage should return quantity half herd page when answer is "no"', () => {
    const answer = new QuantityOptionsAnswer({
      quantityOptions: 'no'
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(quantityHalfHerdPage)
  })

  it('nextPage should return destination summary page when answer is any other value', () => {
    const answer = new QuantityOptionsAnswer({ quantityOptions: 'yes' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(destinationSummaryPage)
  })

  it('should export page', () => {
    expect(quantityOptionsPage).toBeInstanceOf(QuantityOptionsPage)
  })

  describePageSnapshot({
    describes: 'QuantityOptionsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
