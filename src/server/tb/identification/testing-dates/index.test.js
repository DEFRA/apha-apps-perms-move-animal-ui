import { TestingDatesAnswer } from '../../../common/model/answer/testing-dates/testing-dates.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { earTagsPage } from '../ear-tags/index.js'
import { testingDatesPage, TestingDatesPage } from './index.js'

const sectionKey = 'identification'
const question =
  'What are the dates of the last TB tests for the cattle that are 42 days old or older?'

const questionKey = 'testingDates'
const view = 'tb/identification/testing-dates/index'
const pageUrl = '/identification/enter-testing-dates'
const customHeading = 'Testing dates'

describe('TestingDatesPage', () => {
  const page = new TestingDatesPage()

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
    expect(page.Answer).toBe(TestingDatesAnswer)
  })

  it('nextPage should return enter ear tags page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(earTagsPage)
  })

  it('should export page', () => {
    expect(testingDatesPage).toBeInstanceOf(TestingDatesPage)
  })

  describePageSnapshot({
    describes: 'testingDatesPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
