// Animals routes
import animalLocationPage from '../../page-objects/movement-orgin/animal/animalLocationPage.js'
import animalYesNoCPHPage from '../../page-objects/movement-orgin/animal/animalYesNoCPHPage.js'
import animalCPHNumberPage from '../../page-objects/movement-orgin/animal/animalCPHNumberPage.js'
import animalPremisesTypePage from '../../page-objects/movement-orgin/animal/animalPremisesTypePage.js'
import animalsInFieldPage from '../../page-objects/movement-orgin/animal/animalsInFieldPage.js'
import fieldParcelNumberPage from '../../page-objects/movement-orgin/animal/fieldParcelNumberPage.js'
import designatedPremisesPage from '../../page-objects/movement-orgin/animal/designatedPremisesPage.js'
import animalsOnsitePage from '../../page-objects/movement-orgin/animal/animalsOnsitePage.js'

// Products route
import productLocationPage from '../../page-objects/movement-orgin/product/productLocationPage.js'
import productYesNoCPHPage from '../../page-objects/movement-orgin/product/productYesNoCPHPage.js'
import productCPHNumberPage from '../../page-objects/movement-orgin/product/productCPHNumberPage.js'

// Shared
import originAddressPage from '../../page-objects/movement-orgin/originAddressPage.js'
import originCheckAnswersPage from '../../page-objects/movement-orgin/checkAnswersPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

const defaultAddress = {
  lineOne: 'line one',
  townOrCity: 'ts and cs',
  postcode: 'b908dg'
}
const defaultCph = '00/000/0000'

export const completeMovementOriginAnimalsDomestic = async ({
  startFromFirstPage = false,
  cph = defaultCph,
  address = defaultAddress
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, animalLocationPage)

  if (startFromFirstPage) {
    await animalLocationPage.navigateToPageAndVerifyTitle()
  }

  await animalLocationPage.selectRadioAndContinue(
    'domestic-residence',
    animalYesNoCPHPage
  )
  await animalYesNoCPHPage.selectYesAndContinue(animalCPHNumberPage)
  await animalCPHNumberPage.inputParishHoldingNumberAndContinue(
    cph,
    originAddressPage
  )
  await originAddressPage.fillFormFieldsAndSubmit(
    address,
    originCheckAnswersPage
  )
}

export const completeMovementOriginAnimalsOther = async ({
  startFromFirstPage = false,
  animalPremisesType = 'animal premises type',
  cph = defaultCph,
  address = defaultAddress,
  fieldParcelNumber = 'field parcel number',
  animalsOnsite = 'Lions'
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, animalLocationPage)

  await animalLocationPage.selectRadioAndContinue(
    'other',
    animalPremisesTypePage
  )
  await animalPremisesTypePage.inputTextAndContinue(
    animalPremisesType,
    animalYesNoCPHPage
  )
  await animalYesNoCPHPage.selectYesAndContinue(animalCPHNumberPage)
  await animalCPHNumberPage.inputParishHoldingNumberAndContinue(
    cph,
    originAddressPage
  )
  await originAddressPage.fillFormFieldsAndSubmit(address, animalsInFieldPage)
  await animalsInFieldPage.selectYesAndContinue(fieldParcelNumberPage)
  await fieldParcelNumberPage.inputTextAndContinue(
    fieldParcelNumber,
    designatedPremisesPage
  )
  await designatedPremisesPage.selectNoAndContinue(animalsOnsitePage)
  await animalsOnsitePage.inputTextAndContinue(
    animalsOnsite,
    originCheckAnswersPage
  )
}

export const completeMovementOriginProducts = async ({
  startFromFirstPage = false,
  cph = defaultCph,
  address = defaultAddress
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, productLocationPage)

  await productLocationPage.selectRadioAndContinue('farm', productYesNoCPHPage)
  await productYesNoCPHPage.selectYesAndContinue(productCPHNumberPage)
  await productCPHNumberPage.inputParishHoldingNumberAndContinue(
    cph,
    originAddressPage
  )
  await originAddressPage.fillFormFieldsAndSubmit(
    address,
    originCheckAnswersPage
  )
}

export const completeMovementOriginSection = async ({
  route = 'animals-domestic',
  ...rest
} = {}) => {
  switch (route) {
    case 'animals-domestic':
      return completeMovementOriginAnimalsDomestic(rest)
    case 'animals-other':
      return completeMovementOriginAnimalsOther(rest)
    case 'products':
      return completeMovementOriginProducts(rest)
    default:
      throw new Error(`Unknown movement origin route: ${route}`)
  }
}
