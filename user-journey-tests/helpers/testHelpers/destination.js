import taskListPage from '../../page-objects/taskListPage.js'

import { selectElement, waitForPagePath } from '../page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import destinationAddressPage from '../../page-objects/destination/destinationAddressPage.js'
import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import quantityOptionsPage from '../../page-objects/destination/quantityOptionsPage.js'
import halfHerdPage from '../../page-objects/destination/halfHerdPage.js'

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

export const completeDestinationTaskOnFarm = async () => {
  await navigateToTaskList()
  await taskListPage.selectMovementDestination(destinationSelectionPage)

  await destinationSelectionPage.selectLabAndContinue(destinationCPHPage)
  await destinationCPHPage.inputParishHoldingNumberAndContinue(
    '12/123/1234',
    destinationAddressPage
  )
  await destinationAddressPage.fillFormFieldsAndSubmit(
    {
      lineOne: '123',
      townOrCity: 'The street',
      postcode: 'N11AA'
    },
    reasonForMovementPage
  )
  await reasonForMovementPage.selectRestockingAndContinue(quantityOptionsPage)
  await quantityOptionsPage.selectNoAndContinue(halfHerdPage)
  await halfHerdPage.selectNoAndContinue(destinationAnswersPage)
}

export default completeDestinationTask
