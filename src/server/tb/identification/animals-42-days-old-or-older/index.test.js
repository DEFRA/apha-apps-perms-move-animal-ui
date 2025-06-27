import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { testingDatesPage } from '../testing-dates/index.js'
import { Animals42DaysOldOrOlderAnswer } from '../../../common/model/answer/animals-42-days-old-or-older/animals-42-days-old-or-older.js'
import {
  animals42DaysOldOrOlderPage,
  Animals42DaysOldOrOlderPage
} from './index.js'
import { identificationSummaryPage } from '../summary/index.js'

const sectionKey = 'identification'
const question = 'Are you also moving any animals 42 days old or older?'
const questionKey = 'animals42DaysOldOrOlder'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/identification/any-cattle-over-42-days'

describe('Animals42DaysOldOrOlderPage', () => {
  const page = new Animals42DaysOldOrOlderPage()

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
    expect(page.Answer).toBe(Animals42DaysOldOrOlderAnswer)
  })

  it('nextPage should return testing dates page when answer is "yes"', () => {
    const answer = new Animals42DaysOldOrOlderAnswer({
      animals42DaysOldOrOlder: 'yes'
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(testingDatesPage)
  })

  it('nextPage should return animal identification summary page when answer is "no"', () => {
    const answer = new Animals42DaysOldOrOlderAnswer({
      animals42DaysOldOrOlder: 'no'
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(identificationSummaryPage)
  })

  it('should export page', () => {
    expect(animals42DaysOldOrOlderPage).toBeInstanceOf(
      Animals42DaysOldOrOlderPage
    )
  })

  describePageSnapshot({
    describes: 'animals42DaysOldOrOlderPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
