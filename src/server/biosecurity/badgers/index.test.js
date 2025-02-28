import { BadgersAnswer } from '../../common/model/answer/badgers/badgers.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { biosecuritySummaryPage } from '../check-answers/index.js'
import { badgersPage, BadgersPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'How will you reduce the risk of infection from badgers and wildlife?'
const questionKey = 'badgers'
const view = 'biosecurity/badgers/index'
const pageUrl = '/biosecurity/badgers'
const customHeading = 'Infection from wildlife'

describe('BadgersPage', () => {
  const page = new BadgersPage()

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct heading', () => {
    expect(page.heading).toBe(customHeading)
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
    expect(page.Answer).toBe(BadgersAnswer)
  })

  it('nextPage should return summary page for the biosecurity section', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(biosecuritySummaryPage)
  })

  it('should export page', () => {
    expect(badgersPage).toBeInstanceOf(BadgersPage)
  })

  describePageSnapshot({
    describes: 'badgersPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
