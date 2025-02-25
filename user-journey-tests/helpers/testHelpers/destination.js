import taskListPage from '../../page-objects/taskListPage.js'

import { selectElement, waitForPagePath } from '../page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import { navigateToTaskList } from './taskListNav.js'

// Helper function to complete the origin task
const completeDestinationTask = async (radioType) => {
  await navigateToTaskList()
  await taskListPage.selectMovementDestination(destinationSelectionPage)
  switch (radioType) {
    case 'slaughter':
      await destinationSelectionPage.selectSlaughterRadioAndContinue(
        generalLicencePage
      )
      await selectElement(generalLicencePage.continueLink)
      await waitForPagePath(destinationAnswersPage.pagePath)
      break

    case 'dedicated':
      await destinationSelectionPage.selectDedicatedSaleAndContinue(
        destinationAnswersPage
      )
      break

    case 'approved':
      await destinationSelectionPage.selectApprovedFinishingAndContinue(
        destinationAnswersPage
      )
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
  await destinationAnswersPage.verifyPageHeadingAndTitle()
}

export default completeDestinationTask
