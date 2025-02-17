import { EarTagsAnswer } from '../../common/model/answer/ear-tags/ear-tags.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { IdentificationSummaryPage } from '../check-answers/index.js'
import { earTagsPage, EarTagsPage } from './index.js'

const sectionKey = 'identification'
const question =
  'Enter the ear tag numbers of the animals you are planning to move'
const questionKey = 'earTags'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/identification/enter-ear-tags'

describe('EarTagsPage', () => {
  const page = new EarTagsPage()

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
    expect(page.Answer).toBe(EarTagsAnswer)
  })

  it('nextPage should return check answers page', () => {
    const answer = new EarTagsAnswer({ earTags: 'some-text' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBeInstanceOf(IdentificationSummaryPage)
  })

  it('should export page', () => {
    expect(earTagsPage).toBeInstanceOf(EarTagsPage)
  })

  describePageSnapshot({
    describes: 'EarTagsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
