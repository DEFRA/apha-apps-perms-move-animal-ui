import enterWhatIsMovingPage from '../../page-objects/about-the-movement/enterWhatIsMovingPage.js'
import howMuchAreYouMovingPage from '../../page-objects/about-the-movement/howMuchAreYouMovingPage.js'
import whatIsMovingPage from '../../page-objects/about-the-movement/whatIsMovingPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import animalTypePage from '../../page-objects/about-the-movement/animalTypePage.js'
import animalPurposePage from '../../page-objects/about-the-movement/animalPurposePage.js'
import animalIdPage from '../../page-objects/about-the-movement/animalIdPage.js'
import animalsQuantityPage from '../../page-objects/about-the-movement/animalsQuantityPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'

export const completeAboutMovementSection = async ({
  onOffVisit = 'visit',
  liveAnimals = true,
  carcassType = 'snakes',
  carcassQuantity = '45',
  animalType = 'cattle',
  animalQuantity = '9',
  animalPurpose = 'purpose',
  animalId = 'animal id',
  startFromFirstPage = false
} = {}) => {
  const movementTypes = {
    'onto-premises': whatIsMovingPage,
    'off-premises': whatIsMovingPage,
    visit: checkAnswersPage
  }

  const nextPage = movementTypes[onOffVisit] || checkAnswersPage

  if (startFromFirstPage) {
    await movementTypePage.navigateToPageAndVerifyTitle()
  }

  await movementTypePage.selectRadioAndContinue(onOffVisit, nextPage)

  if (onOffVisit === 'visit') return

  if (!liveAnimals) {
    await whatIsMovingPage.selectRadioAndContinue(
      'carcasses',
      enterWhatIsMovingPage
    )
    await enterWhatIsMovingPage.inputTextAndContinue(
      carcassType,
      howMuchAreYouMovingPage
    )
    await howMuchAreYouMovingPage.inputTextAndContinue(
      carcassQuantity,
      checkAnswersPage
    )
    return
  }

  // For live animals
  await whatIsMovingPage.selectRadioAndContinue('live-animals', animalTypePage)
  await animalTypePage.selectRadioAndContinue(animalType, animalsQuantityPage)
  await animalsQuantityPage.inputTextAndContinue(
    animalQuantity,
    animalPurposePage
  )
  await animalPurposePage.inputTextAndContinue(animalPurpose, animalIdPage)
  await animalIdPage.inputTextAndContinue(animalId, checkAnswersPage)
}
