import additionalInfoPage from '../../../page-objects/destination/additionalInfoPage.js'
import destinationAddressPage from '../../../page-objects/destination/destinationAddressPage.js'
import destinationAnswersPage from '../../../page-objects/destination/destinationAnswersPage.js'
import destinationCPHPage from '../../../page-objects/destination/destinationCPHPage.js'
import destinationSelectionPage from '../../../page-objects/destination/destinationSelectionPage.js'
import howManyAnimalsPage from '../../../page-objects/destination/howManyAnimalsPage.js'
import reasonForMovementPage from '../../../page-objects/destination/reasonForMovementPage.js'
import fiftyPercentWarningPage from '../../../page-objects/origin/fiftyPercentWarningPage.js'
import onFarmAddressPage from '../../../page-objects/origin/onFarmAddressPage.js'
import onFarmCPHPage from '../../../page-objects/origin/onFarmCPHPage.js'
import originTypePage from '../../../page-objects/origin/originTypePage.js'
import toFromFarmPage from '../../../page-objects/origin/toFromFarmPage.js'
import taskListPage from '../../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../page.js'

export const enableIdentification = async ({ originZoo, destinationZoo }) => {
  // Origin
  await taskListPage.selectMovementOrigin(toFromFarmPage)
  await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
  if (!originZoo) {
    await originTypePage.selectTbRestrictedFarm(onFarmCPHPage)
  } else {
    await originTypePage.selectTbRestrictedFarm(onFarmCPHPage)
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
    await destinationSelectionPage.selectTbRestrictedFarm(destinationCPHPage)
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
