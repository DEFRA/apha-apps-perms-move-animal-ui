import wholeAnimalYesNoPage from '../../page-objects/disposal-of-the-animal/wholeAnimalYesNoPage.js'
import disposalDatePage from '../../page-objects/disposal-of-the-animal/disposalDatePage.js'
import destinationCarcassesPage from '../../page-objects/disposal-of-the-animal/destinationCarcassesPage.js'
import destinationByProductsPage from '../../page-objects/disposal-of-the-animal/destinationByProductsPage.js'
import destinationNamePage from '../../page-objects/disposal-of-the-animal/destinationNamePage.js'
import destinationNumberPage from '../../page-objects/disposal-of-the-animal/destinationNumberPage.js'
import checkAnswersPage from '../../page-objects/disposal-of-the-animal/checkAnswersPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const DISPOSAL_ROUTES = {
  WHOLE_ANIMAL: 'whole-animal',
  BY_PRODUCTS: 'by-products'
}

export const CARCASS_DEST = {
  KNACKERS_YARD: 'knackers-yard',
  RENDERING_PLANT: 'rendering-plant',
  INCINERATOR: 'incinerator',
  HUNT_KENNEL: 'hunt-kennel'
}

export const BYPRODUCTS_DEST = {
  RENDERING_PLANT: 'rendering-plant',
  INCINERATOR: 'incinerator'
}

const DEFAULTS = {
  disposalDate: { day: '01', month: '01', year: '2050' },
  carcassDestination: CARCASS_DEST.RENDERING_PLANT,
  byProductsDestination: BYPRODUCTS_DEST.RENDERING_PLANT,
  destinationName: 'Acme Processing Ltd',
  destinationPhone: '01234567890'
}

export const completeDisposalOfAnimalSection = async ({
  route = DISPOSAL_ROUTES.WHOLE_ANIMAL,
  carcassDestination = DEFAULTS.carcassDestination,
  byProductsDestination = DEFAULTS.byProductsDestination,
  disposalDate = DEFAULTS.disposalDate,
  destinationName = DEFAULTS.destinationName,
  destinationPhone = DEFAULTS.destinationPhone,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, wholeAnimalYesNoPage)

  const yesNo = route === DISPOSAL_ROUTES.WHOLE_ANIMAL ? 'yes' : 'no'
  await wholeAnimalYesNoPage.selectRadioAndContinue(yesNo, disposalDatePage)

  if (route === DISPOSAL_ROUTES.WHOLE_ANIMAL) {
    await disposalDatePage.enterDateAndContinue(
      disposalDate,
      destinationCarcassesPage
    )
    await destinationCarcassesPage.selectRadioAndContinue(
      carcassDestination,
      destinationNamePage
    )
  } else {
    await disposalDatePage.enterDateAndContinue(
      disposalDate,
      destinationByProductsPage
    )
    await destinationByProductsPage.selectRadioAndContinue(
      byProductsDestination,
      destinationNamePage
    )
  }

  await destinationNamePage.inputTextAndContinue(
    destinationName,
    destinationNumberPage
  )
  await destinationNumberPage.inputTextAndContinue(
    destinationPhone,
    checkAnswersPage
  )
}

export const enumerateDisposalRoutes = () => [
  {
    name: 'Whole animal → destination → CYA',
    opts: { route: DISPOSAL_ROUTES.WHOLE_ANIMAL }
  },
  {
    name: 'By-products only → destination → CYA',
    opts: { route: DISPOSAL_ROUTES.BY_PRODUCTS }
  }
]
