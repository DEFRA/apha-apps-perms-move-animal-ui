import { browser, expect } from '@wdio/globals'

import { loadPageAndVerifyTitle, waitForPagePath } from '../../helpers/page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import canNotUseServicePage from '../../page-objects/destination/canNotUseServicePage.js'

describe('Destination selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      destinationSelectionPage.pagePath,
      destinationSelectionPage.pageTitle
    )
  })

  it('Should verify that the destination page errors when no option is selected', async () => {
    await destinationSelectionPage.destinationSelectionErrorTest()
  })

  it('Should select slaughter radio and continue', async () => {
    await destinationSelectionPage.selectSlaughterRadioAndContinue()
    await expect(destinationSelectionPage.pageError).not.toBeDisplayed()
    await expect(destinationSelectionPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(generalLicencePage.pagePath)
  })

  it('Should choose an option and check its maintained', async () => {
    await destinationSelectionPage.selectDedicatedSaleAndContinue()
    await waitForPagePath(destinationAnswersPage.pagePath)
    await browser.back()
    await expect(destinationSelectionPage.dedicatedSaleRadio).toBeSelected()
  })

  it('Should choose approved finishing and continue', async () => {
    await destinationSelectionPage.selectApprovedFinishingAndContinue()
    await waitForPagePath(destinationAnswersPage.pagePath)
  })

  it('Should choose other destination and continue', async () => {
    await destinationSelectionPage.selectOtherDestinationAndContinue()
    await waitForPagePath(canNotUseServicePage.pagePath)
  })
})
