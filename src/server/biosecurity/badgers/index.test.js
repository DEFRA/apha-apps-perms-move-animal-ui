import { BadgersAnswer } from '../../common/model/answer/badgers/badgers.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { biosecuritySummaryPage } from '../check-answers/index.js'
import { otherWildlifeMeasuresPage } from '../other-wildlife-measures/index.js'
import { badgersPage, BadgersPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Which measures are you taking to reduce the risk of infection from wildlife?'
const questionKey = 'badgers'
const view = 'biosecurity/badgers/index'
const pageUrl = '/biosecurity/badgers'

describe('BadgersPage', () => {
  const page = new BadgersPage()

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
    expect(page.Answer).toBe(BadgersAnswer)
  })

  it('nextPage should return biosecurity summary page when the answer does not include "other"', () => {
    const answer = new BadgersAnswer({ badgers: ['badgerProofFencing'] })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(biosecuritySummaryPage)
  })

  it('nextPage should return other wildlife measures page when the answer includes "other"', () => {
    const answer = new BadgersAnswer({
      badgers: ['badgerProofFencing', 'other']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(otherWildlifeMeasuresPage)
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
