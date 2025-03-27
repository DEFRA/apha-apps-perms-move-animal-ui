import { browser } from '@wdio/globals'

import {
  verifySelectionPersistence,
  waitForPagePath
} from '../../helpers/page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import contactTbRestrictedFarmExitPage from '../../page-objects/destination/contactTbRestrictedFarmExitPage.js'

describe('Destination selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the destination page errors when no option is selected', async () => {
    await destinationSelectionPage.destinationSelectionErrorTest()
  })

  it('Should select slaughter radio and continue', async () => {
    await destinationSelectionPage.selectSlaughterRadioAndContinue(
      generalLicencePage
    )

    await destinationAnswersPage.selectBackLink()
    await waitForPagePath(destinationSelectionPage.pagePath)
  })

  it('Should choose an option and check its maintained', async () => {
    await destinationSelectionPage.selectDedicatedSaleAndContinue(
      destinationAnswersPage
    )
    await verifySelectionPersistence(
      destinationAnswersPage,
      destinationSelectionPage,
      destinationSelectionPage.dedicatedSaleRadio
    )
  })

  it('Should choose approved finishing and continue', async () => {
    await destinationSelectionPage.selectApprovedFinishingAndContinue(
      destinationAnswersPage
    )
  })

  it('Should choose other destination and continue', async () => {
    await destinationSelectionPage.selectOtherDestinationAndContinue(
      contactTbRestrictedFarmExitPage
    )

    await contactTbRestrictedFarmExitPage.selectBackLink()
    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
