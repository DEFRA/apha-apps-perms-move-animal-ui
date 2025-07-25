import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { EarTagsPage } from '../ear-tags/index.js'
import { earTagsOver42DaysOldPage, EarTagsOver42DaysOldPage } from './index.js'

const question = 'Enter the ear tag numbers for these animals'
const pageUrl = '/identification/enter-ear-tags-over-42-days'
const customHeading =
  'Official ear tag numbers for animals 42 days old or older'

describe('EarTagsOver42DaysOldPage', () => {
  const page = new EarTagsOver42DaysOldPage()

  it('should be an instance of EarTagsPage', () => {
    expect(page).toBeInstanceOf(EarTagsPage)
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct heading', () => {
    expect(page.heading).toBe(customHeading)
  })

  it('should export page', () => {
    expect(earTagsOver42DaysOldPage).toBeInstanceOf(EarTagsOver42DaysOldPage)
  })

  describePageSnapshot({
    describes: 'EarTagsOver42DaysOldPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
