import taskListPage from '../../page-objects/taskListPage.js'
import { selectElement, waitForPagePath } from '../page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import destinationAddressPage from '../../page-objects/destination/destinationAddressPage.js'
import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import { navigateToTaskList } from './taskListNav.js'
import howManyAnimalsPage from '../../page-objects/destination/howManyAnimalsPage.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import animalTypePage from '../../page-objects/destination/animalTypePage.js'
import restockingReasonPage from '../../page-objects/destination/restockingReasonPage.js'
import otherRestockingReasonPage from '../../page-objects/destination/otherRestockingReasonPage.js'

const passAdditionalInfo = async () => {
  await additionalInfoPage.selectContinue()
  await waitForPagePath(destinationAnswersPage.pagePath)
}

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
      await waitForPagePath(additionalInfoPage.pagePath)
      await passAdditionalInfo()
      break

    case 'dedicated':
      await destinationSelectionPage.selectDedicatedSaleAndContinue(
        additionalInfoPage
      )
      await passAdditionalInfo()
      break

    case 'approved':
      await destinationSelectionPage.selectApprovedFinishingAndContinue(
        additionalInfoPage
      )
      await passAdditionalInfo()
      break

    default:
      throw new Error(`Unsupported radio type: ${radioType}`)
  }
  await destinationAnswersPage.verifyPageHeadingAndTitle()
}

export const completeDestinationTaskOnFarmForUnrestrictedOrigin = async () => {
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
    howManyAnimalsPage
  )
  await howManyAnimalsPage.inputTextAndContinue('550', reasonForMovementPage)
  await reasonForMovementPage.selectRestockingAndContinue(animalTypePage)
  await animalTypePage.selectCheckboxesAndContinue(
    [animalTypePage.cows],
    restockingReasonPage
  )
  await restockingReasonPage.selectCheckboxesAndContinue(
    [restockingReasonPage.other],
    otherRestockingReasonPage
  )
  await otherRestockingReasonPage.inputTextAndContinue(
    'Other restocking reason',
    additionalInfoPage
  )
  await additionalInfoPage.selectContinue()
  await waitForPagePath(destinationAnswersPage.pagePath)
}

export default completeDestinationTask
