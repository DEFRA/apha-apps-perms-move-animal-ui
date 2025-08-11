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

export const completeMovementOriginSection = async ({
  route = 'animals-domestic', // 'animals-domestic' | 'animals-other' | 'products'
  cph = '00/000/0000',
  address = {
    lineOne: 'line one',
    townOrCity: 'ts and cs',
    postcode: 'b908dg'
  },
  animalPremisesType = 'animal premises type',
  fieldParcelNumber = 'field parcel number',
  animalsOnsite = 'Lions'
} = {}) => {
  switch (route) {
    case 'animals-domestic': {
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
      break
    }

    case 'animals-other': {
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
      await originAddressPage.fillFormFieldsAndSubmit(
        address,
        animalsInFieldPage
      )
      await animalsInFieldPage.selectYesAndContinue(fieldParcelNumberPage)
      await fieldParcelNumberPage.inputTextAndContinue(
        fieldParcelNumber,
        designatedPremisesPage
      )
      await designatedPremisesPage.selectNoAndContinue(animalsOnsitePage) // matches your example
      await animalsOnsitePage.inputTextAndContinue(
        animalsOnsite,
        originCheckAnswersPage
      )
      break
    }

    case 'products': {
      await productLocationPage.selectRadioAndContinue(
        'farm',
        productYesNoCPHPage
      )
      await productYesNoCPHPage.selectYesAndContinue(productCPHNumberPage)
      await productCPHNumberPage.inputParishHoldingNumberAndContinue(
        cph,
        originAddressPage
      )
      await originAddressPage.fillFormFieldsAndSubmit(
        address,
        originCheckAnswersPage
      )
      break
    }

    default:
      throw new Error(`Unknown movement origin route: ${route}`)
  }
}
