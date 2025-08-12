import whereAreAnimalsProductsGoingPage from '../../page-objects/movement-destination/whereAreAnimalsProductsGoingPage.js'
import destinationAddressPage from '../../page-objects/movement-destination/destinationAddressPage.js'
import cphNumberYesNoPage from '../../page-objects/movement-destination/cphNumberYesNoPage.js'
import needCPHNumberPage from '../../page-objects/movement-destination/needCPHNumberPage.js'
import cphInputPage from '../../page-objects/movement-destination/cphInputPage.js'
import responsibleForDestinationPage from '../../page-objects/movement-destination/responsibleForDestinationPage.js'
import destinationCheckAnswersPage from '../../page-objects/movement-destination/destinationCheckAnswersPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const completeDestinationSection = async ({
  liveAnimals = true,
  destination = liveAnimals ? 'slaughter' : 'corporate-holding',
  address = {
    lineOne: 'line one',
    townOrCity: 'ts and cs',
    postcode: 'b908dg'
  },
  cph = '00/000/0000',
  firstName = 'FirstName',
  lastName = 'LastName',
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(
    startFromFirstPage,
    whereAreAnimalsProductsGoingPage
  )

  await whereAreAnimalsProductsGoingPage.selectRadioAndContinue(
    destination,
    destinationAddressPage
  )

  await destinationAddressPage.fillFormFieldsAndSubmit(
    address,
    liveAnimals ? cphNumberYesNoPage : responsibleForDestinationPage
  )

  if (liveAnimals) {
    await cphNumberYesNoPage.selectNoAndContinue(needCPHNumberPage)
    await needCPHNumberPage.selectContinue()

    await waitForPagePath(cphInputPage.pagePath)
    await cphInputPage.inputParishHoldingNumberAndContinue(
      cph,
      responsibleForDestinationPage
    )
  }

  await responsibleForDestinationPage.inputTextAndContinue(
    firstName,
    lastName,
    destinationCheckAnswersPage
  )
}
