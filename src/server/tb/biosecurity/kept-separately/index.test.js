import { KeptSeparatelyAnswer } from '../../../common/model/answer/kept-separately/kept-separately.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { grazingPage } from '../grazing/index.js'
import { manureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'
import { keptSeparatelyPage, KeptSeparatelyPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'Will you separate the incoming cattle from the resident herd?'
const questionKey = 'keptSeparately'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/kept-separately'

describe('KeptSeparatelyPage', () => {
  const page = new KeptSeparatelyPage()

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
    expect(page.Answer).toBe(KeptSeparatelyAnswer)
  })

  it('nextPage should return grazing when answer is "yes"', () => {
    const answer = new KeptSeparatelyAnswer({ keptSeparately: 'yes' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(grazingPage)
  })

  it('nextPage should return disinfection page when answer is "no"', () => {
    const answer = new KeptSeparatelyAnswer({ keptSeparately: 'no' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(manureAndSlurryDetailsPage)
  })

  it('should export page', () => {
    expect(keptSeparatelyPage).toBeInstanceOf(KeptSeparatelyPage)
  })

  describePageSnapshot({
    describes: 'keptSeparatelyPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
