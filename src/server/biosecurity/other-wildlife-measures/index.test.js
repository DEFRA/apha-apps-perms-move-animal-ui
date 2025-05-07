import {
  otherWildlifeMeasuresPage,
  OtherWildlifeMeasuresPage
} from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { biosecuritySummaryPage } from '../check-answers/index.js'
import { OtherWildlifeMeasuresAnswer } from '../../common/model/answer/other-wildlife-measures/other-wildlife-measures.js'

const sectionKey = 'biosecurity'
const question =
  'What other measures are you taking to reduce the risk of spreading TB?'
const questionKey = 'otherWildlifeMeasures'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/other-wildlife-measures'

describe('OtherWildlifeMeasuresPage', () => {
  const page = new OtherWildlifeMeasuresPage()

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
    expect(page.Answer).toBe(OtherWildlifeMeasuresAnswer)
  })

  it('nextPage should return destination summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(biosecuritySummaryPage)
  })

  it('should export page', () => {
    expect(otherWildlifeMeasuresPage).toBeInstanceOf(OtherWildlifeMeasuresPage)
  })

  describePageSnapshot({
    describes: 'OtherWIldlifeMEasuresPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
