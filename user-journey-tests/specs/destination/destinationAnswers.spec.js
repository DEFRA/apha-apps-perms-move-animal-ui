import {
  selectElement,
  validateElementVisibleAndText,
  waitForPagePath
} from '../../helpers/page.js'
import completeDestinationTask from '../../helpers/testHelpers/destination.js'
import completeOriginTaskAnswers from '../../helpers/testHelpers/movementOrigin.js'
import contactTbRestrictedFarmExitPage from '../../page-objects/destination/contactTbRestrictedFarmExitPage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Check your answers test - destination', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete origin task', async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await completeOriginTaskAnswers()
    // await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify slaughter answer and change link', async () => {
    await completeDestinationTask('slaughter')
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Slaughter'
    )

    await selectElement(
      await destinationAnswersPage.getChangeLink('destinationType')
    )
    await expect(destinationSelectionPage.slaughterRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await generalLicencePage.selectContinueLink()
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Slaughter'
    )
  })

  it('Should verify dedicated sale for TB answer and change link', async () => {
    await completeDestinationTask('dedicated')
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Dedicated sale for TB (orange market)'
    )

    await selectElement(
      await destinationAnswersPage.getChangeLink('destinationType')
    )
    await expect(destinationSelectionPage.dedicatedSaleRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Dedicated sale for TB (orange market)'
    )
  })

  it('Should verify approved finishing unit answer and change link', async () => {
    await completeDestinationTask('approved')
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Approved finishing unit (AFU)'
    )

    await selectElement(
      await destinationAnswersPage.getChangeLink('destinationType')
    )
    await expect(destinationSelectionPage.approvedFinishingRadio).toBeSelected()

    await destinationSelectionPage.selectContinue()
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Approved finishing unit (AFU)'
    )
  })

  it('Should verify continue link', async () => {
    await completeDestinationTask('approved')
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Approved finishing unit (AFU)'
    )

    await destinationAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should handle "Another destination" as an exit page & redirect users back to the preceding question', async () => {
    await completeDestinationTask('dedicated')
    await validateElementVisibleAndText(
      await destinationAnswersPage.getValue('destinationType'),
      'Dedicated sale for TB (orange market)'
    )

    await selectElement(
      await destinationAnswersPage.getChangeLink('destinationType')
    )
    await destinationSelectionPage.selectOtherDestinationAndContinue(
      contactTbRestrictedFarmExitPage
    )
    await contactTbRestrictedFarmExitPage.selectBackLink()
    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
