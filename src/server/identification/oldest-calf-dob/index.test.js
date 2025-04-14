import { CalfDob } from '../../common/model/answer/calf-dob/calf-dob.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { earTagsCalvesPage } from '../ear-tags-calves/index.js'
import { identificationWarningPage } from '../warning/index.js'
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

  it('should export page', () => {
    expect(oldestCalfDobPage).toBeInstanceOf(OldestCalfDobPage)
  })

  it('nextPage should return identificationWarningPage when the calf is older than 35 days', () => {
    const answer = new CalfDob({
      day: '1',
      month: '1',
      year: '2020'
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(identificationWarningPage)
  })

  it('nextPage should return earTagsCalvesPage when the calf is 35 days old or younger', () => {
    const today = new Date()
    const answer = new CalfDob({
      day: today.getDate().toString(),
      month: (today.getMonth() + 1).toString(),
      year: today.getFullYear().toString()
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(earTagsCalvesPage)
  })

  describePageSnapshot({
    describes: 'oldestCalfDobPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
