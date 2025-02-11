import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { selectElement, waitForPagePath } from '../page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'

// Helper function to complete the origin task
const completeDestinationTask = async (radioType) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectMovementDestination()
  switch (radioType) {
    case 'slaughter':
      await destinationSelectionPage.selectSlaughterRadioAndContinue()
      await waitForPagePath(generalLicencePage.pagePath)
      await selectElement(generalLicencePage.continueLink)
      await waitForPagePath(destinationAnswersPage.pagePath)
      break

    case 'dedicated':
      await destinationSelectionPage.selectDedicatedSaleAndContinue()
      await waitForPagePath(destinationAnswersPage.pagePath)
      break

    case 'approved':
      await destinationSelectionPage.selectApprovedFinishingAndContinue()
      await waitForPagePath(destinationAnswersPage.pagePath)
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
  await destinationAnswersPage.verifyPageHeadingAndTitle()
}

export default completeDestinationTask
