import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { DestinationGeneralLicencePage } from './index.js'

/** @import { Server } from '@hapi/hapi' */

const sectionKey = 'destination'
const heading = 'Check if you have a general licence'
const urlKey = 'use-general-licence'
const view = 'tb/destination/general-licence/index'
const pageUrl = '/destination/use-general-licence'

const nextPage = additionalInfoPage
const page = new DestinationGeneralLicencePage()

describe('DestinationGeneralLicencePage', () => {
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

  it('should know the next page is the summary page', () => {
    expect(page.nextPage().urlPath).toBe(nextPage.urlPath)
  })

  it('should be able ot calculate the next page URL as a string for the template', async () => {
    expect((await page.viewProps()).continueUrl).toBe(nextPage.urlPath)
  })
})

describePageSnapshot({
  describes: 'DestinationGeneralLicenceController',
  it: 'should render the expected content',
  pageUrl: page.urlPath
})
