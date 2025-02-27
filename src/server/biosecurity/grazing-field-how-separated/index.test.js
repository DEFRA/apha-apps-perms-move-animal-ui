import { GrazingFieldHowSeparatedAnswer } from '../../common/model/answer/grazing-field-how-separated/grazing-field-how-separated.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import {
  grazingFieldHowSeparatedPage,
  GrazingFieldHowSeparatedPage
} from './index.js'

const sectionKey = 'biosecurity'
const question = 'How is this grazing field separated from the resident herd?'
const questionKey = 'grazingFieldHowSeparated'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/grazing-field-how-separated'

describe('GrazingFieldHowSeparatedPage', () => {
  const page = new GrazingFieldHowSeparatedPage()

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
    expect(page.Answer).toBe(GrazingFieldHowSeparatedAnswer)
  })

  it('nextPage should return any shared buildings page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(buildingsAnySharedPage)
  })

  it('should export page', () => {
    expect(grazingFieldHowSeparatedPage).toBeInstanceOf(
      GrazingFieldHowSeparatedPage
    )
  })

  describePageSnapshot({
    describes: 'grazingFieldHowSeparatedPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
