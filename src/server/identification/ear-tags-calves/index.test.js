import { EarTagsCalvesAnswer } from '../../common/model/answer/ear-tags/ear-tags-calves.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { animals42DaysOldOrOlderPage } from '../animals-42-days-old-or-older/index.js'
import { earTagsCalvesPage, EarTagsCalvesPage } from './index.js'

const sectionKey = 'identification'
const question =
  'Enter the ear tag numbers of the calves under 42 days old you are planning to move'
const questionKey = 'earTagsCalves'
const view = 'identification/ear-tags-calves/index'
const pageUrl = '/identification/enter-ear-tags-calves'
const customHeading = 'Official ear tag numbers for calves under 42 days old'

describe('EarTagsCalvesPage', () => {
  const page = new EarTagsCalvesPage()

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

  it('should have the correct heading', () => {
    expect(page.heading).toBe(customHeading)
  })

  it('should have the correct title', () => {
    expect(page.title).toBe(question)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(EarTagsCalvesAnswer)
  })

  it('nextPage should return identification summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(animals42DaysOldOrOlderPage)
  })

  it('should export page', () => {
    expect(earTagsCalvesPage).toBeInstanceOf(EarTagsCalvesPage)
  })

  describePageSnapshot({
    describes: 'EarTagsCalvesPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
