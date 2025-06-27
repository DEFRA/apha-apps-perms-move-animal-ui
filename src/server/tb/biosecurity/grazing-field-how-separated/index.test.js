import { GrazingFieldHowSeparatedAnswer } from '../../../common/model/answer/grazing-field-how-separated/grazing-field-how-separated.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { lastGrazedPage } from '../last-grazed/index.js'
import {
  grazingFieldHowSeparatedPage,
  GrazingFieldHowSeparatedPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'How will you separate the incoming cattle from the resident herd?'
const questionKey = 'grazingFieldHowSeparated'
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
    expect(page.view).toBe('tb/biosecurity/grazing-field-how-separated/index.njk')
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(GrazingFieldHowSeparatedAnswer)
  })

  it('nextPage should return any shared buildings page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(lastGrazedPage)
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
