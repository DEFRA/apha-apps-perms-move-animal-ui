import { EarTagsAnswer } from '../../common/model/answer/ear-tags/ear-tags.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { identificationSummaryPage } from '../check-answers/index.js'
import { earTagsPage, EarTagsPage } from './index.js'

const sectionKey = 'identification'
const question = 'Enter the ear tag numbers for these animals'
const questionKey = 'earTags'
const view = 'identification/ear-tags/index'
const pageUrl = '/identification/enter-ear-tags'
const customHeading =
  'Official ear tag numbers for animals 42 days old or older'

describe('EarTagsPage', () => {
  const page = new EarTagsPage()

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

  it('should have the correct heading', () => {
    expect(page.heading).toBe(customHeading)
  })

  it('should have the correct title', () => {
    expect(page.title).toBe(question)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(EarTagsAnswer)
  })

  it('nextPage should return identification summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(identificationSummaryPage)
  })

  it('should export page', () => {
    expect(earTagsPage).toBeInstanceOf(EarTagsPage)
  })

  describePageSnapshot({
    describes: 'earTagsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
