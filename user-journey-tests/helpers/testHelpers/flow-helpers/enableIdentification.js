import additionalInfoPage from '../../../page-objects/destination/additionalInfoPage'
import destinationAddressPage from '../../../page-objects/destination/destinationAddressPage'
import destinationAnswersPage from '../../../page-objects/destination/destinationAnswersPage'
import destinationCPHPage from '../../../page-objects/destination/destinationCPHPage'
import destinationSelectionPage from '../../../page-objects/destination/destinationSelectionPage'
import howManyAnimalsPage from '../../../page-objects/destination/howManyAnimalsPage'
import reasonForMovementPage from '../../../page-objects/destination/reasonForMovementPage'
import fiftyPercentWarningPage from '../../../page-objects/origin/fiftyPercentWarningPage'
import onFarmAddressPage from '../../../page-objects/origin/onFarmAddressPage'
import onFarmCPHPage from '../../../page-objects/origin/onFarmCPHPage'
import originTypePage from '../../../page-objects/origin/originTypePage'
import toFromFarmPage from '../../../page-objects/origin/toFromFarmPage'
import taskListPage from '../../../page-objects/taskListPage'
import { waitForPagePath } from '../../page'

export const enableIdentification = async (
  originZoo = false,
  destinationZoo = false
) => {
  // Origin
  await taskListPage.selectMovementOrigin(toFromFarmPage)
  await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
  if (!originZoo) {
    await originTypePage.selectTBRestrictedFarmAndContinue(onFarmCPHPage)
  } else {
    await originTypePage.selectZooAndContinue(onFarmCPHPage)
  }
  await onFarmCPHPage.inputParishHoldingNumberAndContinue(
    '12/123/1234',
    onFarmAddressPage
  )
  await onFarmAddressPage.fillFormFieldsAndSubmit(
    {
      lineOne: 'line one',
      townOrCity: 'town',
      postcode: 'N11AA'
    },
    fiftyPercentWarningPage
  )
  await taskListPage.navigateToPageAndVerifyTitle()

  // Destination
  await taskListPage.selectMovementDestination(destinationSelectionPage)
  if (!destinationZoo) {
    await destinationSelectionPage.selectTbRestrictedFarm(destinationCPHPage)
  } else {
    await destinationSelectionPage.selectZooAndContinue(destinationCPHPage)
  }

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
  await reasonForMovementPage.selectOtherAndContinue(additionalInfoPage)
  await additionalInfoPage.selectContinue()
  await waitForPagePath(destinationAnswersPage.pagePath)
  await destinationAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
}
