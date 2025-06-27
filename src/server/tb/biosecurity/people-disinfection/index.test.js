import { PeopleDisinfectionAnswer } from '../../../common/model/answer/people-disinfection/people-disinfection.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { badgersPage } from '../badgers/index.js'
import { otherStaffMeasuresPage } from '../other-staff-measures/index.js'
import { peopleDisinfectionPage, PeopleDisinfectionPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Which measures are staff taking to reduce the risk of spreading TB?'
const questionKey = 'peopleDisinfection'
const pageUrl = '/biosecurity/people-disinfection'

describe('PeopleDisinfectionPage', () => {
  const page = new PeopleDisinfectionPage()

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

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(PeopleDisinfectionAnswer)
  })

  it('nextPage should return badgers page when the answer does not include "other"', () => {
    const answer = new PeopleDisinfectionAnswer({
      peopleDisinfection: ['ppe']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(badgersPage)
  })

  it('nextPage should return other staff measures page when the answer includes "other"', () => {
    const answer = new PeopleDisinfectionAnswer({
      peopleDisinfection: ['ppe', 'other']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(otherStaffMeasuresPage)
  })

  it('should export page', () => {
    expect(peopleDisinfectionPage).toBeInstanceOf(PeopleDisinfectionPage)
  })

  describePageSnapshot({
    describes: 'peopleDisinfectionPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
