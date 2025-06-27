import { BiosecurityObligationsAnswer } from '../../../common/model/answer/biosecurity-obligations/biosecurity-obligations.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { keptSeparatelyPage } from '../kept-separately/index.js'
import { ObligationsPage, obligationsPage } from './index.js'

const sectionKey = 'biosecurity'
const questionKey = 'biosecurityObligationsAcknowledged'
const view = 'tb/biosecurity/obligations/index.njk'
const pageUrl = '/biosecurity/biosecurity-intro'
const question = 'Biosecurity on your farm or premises'

describe('ObligationsPage', () => {
  const page = new ObligationsPage()

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

  it('should have the correct isInterstitial', () => {
    expect(page.isInterstitial).toBe(true)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(BiosecurityObligationsAnswer)
  })

  it('nextPage should return kept separately page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(keptSeparatelyPage)
  })

  it('should export page', () => {
    expect(obligationsPage).toBeInstanceOf(ObligationsPage)
  })

  describePageSnapshot({
    describes: 'ObligationsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
