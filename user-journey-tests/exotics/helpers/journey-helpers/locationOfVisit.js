import whereVisitWillTakePlacePage from '../../page-objects/location-of-visit/whereVisitWillTakePlacePage.js'
import cphNumberPage from '../../page-objects/location-of-visit/cphNumberPage.js'
import visitAddressPage from '../../page-objects/location-of-visit/visitAddressPage.js'
import registeredFieldPage from '../../page-objects/location-of-visit/registeredFieldPage.js'
import locationDetailsPage from '../../page-objects/location-of-visit/locationDetailsPage.js'
import designatedPremisesPage from '../../page-objects/location-of-visit/designatedPremisesPage.js'
import whatAnimalsOnPremisesPage from '../../page-objects/location-of-visit/whatAnimalsOnPremisesPage.js'
import checkAnswersPage from '../../page-objects/location-of-visit/checkAnswersPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const completeWhereVisitTakesPlaceSection = async ({
  locationType = 'farm', // or 'domestic-residence'
  cph = '00/000/0000',
  address = {
    lineOne: 'line one',
    townOrCity: 'ts and cs',
    postcode: 'b908dg'
  },
  registeredField = false,
  locationDetails = 'LAT AND LONG',
  designatedPremises = 'unknown',
  animalsOnPremises = 'Lions',
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, whereVisitWillTakePlacePage)

  if (locationType === 'farm') {
    await whereVisitWillTakePlacePage.selectRadioAndContinue(
      locationType,
      cphNumberPage
    )
    await cphNumberPage.inputParishHoldingNumberAndContinue(
      cph,
      visitAddressPage
    )
    await visitAddressPage.fillFormFieldsAndSubmit(address, registeredFieldPage)
    await registeredFieldPage.selectRadioAndContinue(
      registeredField ? 'yes' : 'no',
      locationDetailsPage
    )
    await locationDetailsPage.inputTextAndContinue(
      locationDetails,
      designatedPremisesPage
    )
    await designatedPremisesPage.selectRadioAndContinue(
      designatedPremises,
      whatAnimalsOnPremisesPage
    )
  } else {
    await whereVisitWillTakePlacePage.selectRadioAndContinue(
      locationType,
      visitAddressPage
    )
    await visitAddressPage.fillFormFieldsAndSubmit(
      address,
      whatAnimalsOnPremisesPage
    )
  }

  await whatAnimalsOnPremisesPage.inputTextAndContinue(
    animalsOnPremises,
    checkAnswersPage
  )
}
