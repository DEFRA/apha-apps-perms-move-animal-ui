import whatIsMovingPage from '../../page-objects/about-the-movement/whatIsMovingPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import animalTypePage from '../../page-objects/about-the-movement/animalTypePage.js'
import animalIdPage from '../../page-objects/about-the-movement/animalIdPage.js'
import animalsQuantityPage from '../../page-objects/about-the-movement/animalsQuantityPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'
import milkResponsibilityPage from '../../page-objects/about-the-movement/milkResponsibilityPage.js'
import slaughterYesNoPage from '../../page-objects/about-the-movement/slaughterYesNoPage.js'
import animalTypeSlaughterPage from '../../page-objects/about-the-movement/animalTypeSlaughterPage.js'
import howManySlaighterPage from '../../page-objects/about-the-movement/howManySlaighterPage.js'
import animalTypeMilkPage from '../../page-objects/about-the-movement/animalTypeMilkPage.js'

const DEFAULTS = {
  carcassType: 'mixed carcasses',
  carcassQty: '10',
  animalType: 'cattle',
  animalQty: '8',
  animalIds: 'UK123456 00001, UK123456 00002',
  milkAnimal: 'cow'
}

export const completeAboutMovementFromDiagram = async ({
  movementContext = 'off-of-farm',
  moving = 'live-animals',
  toSlaughter = false,
  milkResponsible = true,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, movementTypePage)

  if (movementContext === 'slaughter-onsite') {
    await movementTypePage.selectRadioAndContinue(
      'slaughter-onsite',
      animalTypeSlaughterPage
    )
    await animalTypeSlaughterPage.selectRadioAndContinue(
      DEFAULTS.animalType,
      howManySlaighterPage
    )
    await howManySlaighterPage.inputTextAndContinue(
      DEFAULTS.animalQty,
      animalIdPage
    )
    await animalIdPage.inputTextAndContinue(
      DEFAULTS.animalIds,
      checkAnswersPage
    )
    return
  }

  const movementTypeValue =
    movementContext === 'on-to-farm' ? 'on-to-farm' : 'off-of-farm'
  await movementTypePage.selectRadioAndContinue(
    movementTypeValue,
    whatIsMovingPage
  )

  if (moving === 'carcasses' && movementContext === 'off-of-farm') {
    await whatIsMovingPage.selectRadioAndContinue('carcasses', animalTypePage)
    await animalTypePage.selectRadioAndContinue(
      DEFAULTS.animalType,
      animalsQuantityPage
    )
    await animalsQuantityPage.inputTextAndContinue(
      DEFAULTS.animalQty,
      animalIdPage
    )
    await animalIdPage.inputTextAndContinue(
      DEFAULTS.animalIds,
      checkAnswersPage
    )
    return
  }

  if (moving === 'milk' && movementContext === 'off-of-farm') {
    await whatIsMovingPage.selectRadioAndContinue(
      'milk',
      milkResponsibilityPage
    )
    const responsibilityAnswer = milkResponsible ? 'yes' : 'no'
    await milkResponsibilityPage.selectRadioAndContinue(
      responsibilityAnswer,
      milkResponsible ? animalTypeMilkPage : infoNoLicenceNeededPage
    )
    if (!milkResponsible) {
      return
    }
    await animalTypeMilkPage.selectRadioAndContinue(
      DEFAULTS.milkAnimal,
      checkAnswersPage
    )
    return
  }

  await whatIsMovingPage.selectRadioAndContinue(
    'live-animals',
    slaughterYesNoPage
  )

  if (toSlaughter) {
    await slaughterYesNoPage.selectRadioAndContinue('yes', animalTypePage)
    await animalTypePage.selectRadioAndContinue(
      DEFAULTS.animalType,
      animalsQuantityPage
    )
    await animalsQuantityPage.inputTextAndContinue(
      DEFAULTS.animalQty,
      animalIdPage
    )
    await animalIdPage.inputTextAndContinue(
      DEFAULTS.animalIds,
      checkAnswersPage
    )
    return
  }

  await slaughterYesNoPage.selectRadioAndContinue('no', animalTypePage)
  await animalTypePage.selectRadioAndContinue(
    DEFAULTS.animalType,
    animalsQuantityPage
  )
  await animalsQuantityPage.inputTextAndContinue(
    DEFAULTS.animalQty,
    animalIdPage
  )
  await animalIdPage.inputTextAndContinue(DEFAULTS.animalIds, checkAnswersPage)
}

export const enumerateRoutes = () => [
  {
    name: 'On premises → Live animals (non-slaughter)',
    opts: {
      movementContext: 'on-to-farm',
      moving: 'live-animals',
      toSlaughter: false
    }
  },
  {
    name: 'On premises → Live animals (to slaughter)',
    opts: {
      movementContext: 'on-to-farm',
      moving: 'live-animals',
      toSlaughter: true
    }
  },
  {
    name: 'On premises → Carcasses',
    opts: { movementContext: 'on-to-farm', moving: 'carcasses' }
  },
  {
    name: 'On premises → Milk (responsible)',
    opts: {
      movementContext: 'on-to-farm',
      moving: 'milk',
      milkResponsible: true
    }
  },
  {
    name: 'On premises → Milk (not responsible)',
    opts: {
      movementContext: 'on-to-farm',
      moving: 'milk',
      milkResponsible: false
    }
  },
  {
    name: 'Off premises → Live animals (non-slaughter)',
    opts: {
      movementContext: 'off-of-farm',
      moving: 'live-animals',
      toSlaughter: false
    }
  },
  {
    name: 'Off premises → Live animals (to slaughter)',
    opts: {
      movementContext: 'off-of-farm',
      moving: 'live-animals',
      toSlaughter: true
    }
  },
  {
    name: 'Off premises → Carcasses',
    opts: { movementContext: 'off-of-farm', moving: 'carcasses' }
  },
  {
    name: 'Off premises → Milk (responsible)',
    opts: {
      movementContext: 'off-of-farm',
      moving: 'milk',
      milkResponsible: true
    }
  },
  {
    name: 'Off premises → Milk (not responsible)',
    opts: {
      movementContext: 'off-of-farm',
      moving: 'milk',
      milkResponsible: false
    }
  },
  {
    name: 'Slaughter on site (shortcut path)',
    opts: { movementContext: 'slaughter-on-site' }
  }
]
