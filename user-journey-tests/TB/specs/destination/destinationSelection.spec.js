import {
  verifySelectionPersistence,
  waitForPagePath
} from '../../helpers/page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import contactTbRestrictedFarmExitPage from '../../page-objects/destination/contactTbRestrictedFarmExitPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'

describe('Destination selection test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
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
      additionalInfoPage
    )
    await verifySelectionPersistence(
      additionalInfoPage,
      destinationSelectionPage,
      destinationSelectionPage.dedicatedSaleRadio
    )
  })

  it('Should choose approved finishing and continue', async () => {
    await destinationSelectionPage.selectApprovedFinishingAndContinue(
      additionalInfoPage
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
