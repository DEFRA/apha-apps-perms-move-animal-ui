import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import { destinationVariants } from '../../helpers/testHelpers/movementOrigin.js'
import { verifyRadioButtonNumber, waitForElement } from '../../helpers/page.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import serviceUnavailablePage from '../../page-objects/destination/serviceUnavailablePage.js'
import otherDestinationTypePage from '../../page-objects/destination/otherDestinationTypePage.js'

describe('Destination selection options test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session', async () => {
    await restoreSession()
  })

  it('Should verify options when On the farm and AFU IS NOT option selected', async () => {
    await destinationVariants(true, false)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await verifyRadioButtonNumber(5)
    await destinationSelectionPage.selectZooAndContinue(destinationCPHPage)
  })

  it('Should verify other selection when On the farm and AFU IS NOT option selected', async () => {
    await destinationVariants(true, false)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await destinationSelectionPage.selectOtherDestinationAndContinue(
      otherDestinationTypePage
    )
  })

  it('Should verify options when On the farm and AFU IS selected', async () => {
    await destinationVariants(true, true)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await verifyRadioButtonNumber(1)
    await destinationSelectionPage.selectApprovedFinishingAndContinue(
      destinationCPHPage
    )
  })

  it('Should verify options when Off the farm and AFU IS NOT selected', async () => {
    await destinationVariants(false, false)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await verifyRadioButtonNumber(8)
    await destinationSelectionPage.selectApprovedFinishingAndContinue(
      destinationAnswersPage
    )
  })

  it('Should verify options when Off the farm and AFU IS NOT selected', async () => {
    await destinationVariants(false, false)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await destinationSelectionPage.selectTBIsolationUnitAndContunue(
      serviceUnavailablePage
    )
    await waitForElement(serviceUnavailablePage.govUkFormLink)
  })

  it('Should verify options when Off the farm and AFU IS selected', async () => {
    await destinationVariants(false, true)
    await destinationSelectionPage.navigateToPageAndVerifyTitle()
    await verifyRadioButtonNumber(2)
    await destinationSelectionPage.selectSlaughterRadioAndContinue(
      generalLicencePage
    )
  })
})
