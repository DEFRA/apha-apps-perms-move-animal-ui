import { CalvesUnder42DaysOldAnswer } from '../../common/model/answer/calves-under-42-days-old/calves-under-42-days-old.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { enterTestingDatesPage } from '../enter-testing-dates/index.js'
import { oldestCalfDobPage } from '../oldest-calf-dob/index.js'
import { calvesUnder42DaysOldPage, CalvesUnder42DaysOldPage } from './index.js'

const sectionKey = 'identification'
const question = 'Will you move any calves under 42 days old?'
const questionKey = 'calvesUnder42DaysOld'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/identification/any-calves'

describe('CalvesUnder42DaysOldPage', () => {
  const page = new CalvesUnder42DaysOldPage()

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
    expect(page.Answer).toBe(CalvesUnder42DaysOldAnswer)
  })

  it('nextPage should return how to minimise contamination page when answer is "yes"', () => {
    const answer = new CalvesUnder42DaysOldAnswer({
      calvesUnder42DaysOld: 'yes'
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(oldestCalfDobPage)
  })

  it('nextPage should return people disinfection page when answer is "no"', () => {
    const answer = new CalvesUnder42DaysOldAnswer({
      calvesUnder42DaysOld: 'no'
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(enterTestingDatesPage)
  })

  it('should export page', () => {
    expect(calvesUnder42DaysOldPage).toBeInstanceOf(CalvesUnder42DaysOldPage)
  })

  describePageSnapshot({
    describes: 'calvesUnder42DaysOldPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
