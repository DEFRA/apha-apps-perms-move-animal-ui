import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { OriginSummaryPage } from '../summary/index.js'
import { FiftyPercentWarningPage } from './index.js'

const sectionKey = 'origin'
const heading = 'Reduction in TB compensation'
const urlKey = 'fifty-percent-warning'
const view = 'tb/origin/fifty-percent-warning/index'
const pageUrl = '/origin/fifty-percent-warning'

const nextPage = new OriginSummaryPage()
const page = new FiftyPercentWarningPage()

describe('FiftyPercentWarningPage', () => {
  it('should have correct url path', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.pageHeading).toBe(heading)
  })

  it('should have the correct questionKey', () => {
    expect(page.urlKey).toBe(urlKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should override redirects', () => {
    expect(page.overrideRedirects).toBe(true)
  })

  it('should know the next page is the summary page', () => {
    expect(page.nextPage().urlPath).toBe(nextPage.urlPath)
  })

  it('should be able ot calculate the next page URL as a string for the template', () => {
    expect(page.viewProps().continueUrl).toBe(nextPage.urlPath)
  })
})

describePageSnapshot({
  describes: 'DestinationGeneralLicenceController',
  it: 'should render the expected content',
  pageUrl: page.urlPath
})
