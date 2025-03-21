import {
  selectElement,
  validateElementVisibleAndText,
  waitForElement,
  waitForPagePath
} from '../../helpers/page.js'
import completeDestinationTask from '../../helpers/testHelpers/destination.js'
import completeOriginTaskAnswers from '../../helpers/testHelpers/movementOrigin.js'
import contactTbRestrictedFarmExitPage from '../../page-objects/destination/contactTbRestrictedFarmExitPage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Check your answers test - destination', () => {
  beforeEach('Navigate to check answers page', async () => {
    await browser.reloadSession()
    await completeOriginTaskAnswers()
    await landingPage.navigateToPageAndVerifyTitle()
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
    await destinationSelectionPage.selectBackLink()
    await waitForElement(
      await destinationAnswersPage.getValue('destinationType')
    )
    await browser.refresh()

    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
