import { DestinationSummaryPage } from '../summary/index.js'
import { DestinationGeneralLicencePage } from './index.js'

const sectionKey = 'destination'
const heading = 'Check if you have a general licence'
const key = 'use-general-licence'
const view = 'destination/general-licence/index'
const pageUrl = '/destination/use-general-licence'

const nextPage = new DestinationSummaryPage()

describe('DestinationGeneralLicencePage', () => {
  let page

  beforeEach(() => {
    page = new DestinationGeneralLicencePage()
  })

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
    expect(page.key).toBe(key)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should know the next page is the summary page', () => {
    expect(page.nextPage()).toEqual(nextPage)
  })

  it('should be able ot calculate the next page URL as a string for the template', () => {
    expect(page.viewProps.continueUrl).toBe(nextPage.urlPath)
  })
})
