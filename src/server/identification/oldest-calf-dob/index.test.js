import { CalfDob } from '../../common/model/answer/calf-dob/calf-dob.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { oldestCalfDobPage, OldestCalfDobPage } from './index.js'

const sectionKey = 'identification'
const question =
  'What is the date of birth of the oldest calf under 42 days old?'
const questionKey = 'oldestCalfDob'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/identification/oldest-calf-dob'

describe('OldestCalfDobPage', () => {
  const page = new OldestCalfDobPage()

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
    expect(page.Answer).toBe(CalfDob)
  })

  it('nextPage should return how to minimise contamination page when answer is "yes"', () => {
    // const answer = new CalvesUnder42DaysOldAnswer({
    //   calvesUnder42DaysOld: 'yes'
    // })
    // const nextPage = page.nextPage(answer)
    // expect(nextPage).toBe(oldestCalfDobPage)
  })

  it('nextPage should return people disinfection page when answer is "no"', () => {
    // const answer = new CalvesUnder42DaysOldAnswer({
    //   calvesUnder42DaysOld: 'no'
    // })
    // const nextPage = page.nextPage(answer)
    // expect(nextPage).toBe(testingDatesPage)
  })

  it('should export page', () => {
    expect(oldestCalfDobPage).toBeInstanceOf(OldestCalfDobPage)
  })

  describePageSnapshot({
    describes: 'oldestCalfDobPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
