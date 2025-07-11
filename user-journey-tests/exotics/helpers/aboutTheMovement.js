import describeWhatYouAreMovingPage from '../page-objects/about-the-movement/describeWhatYouAreMovingPage.js'
import enterWhatIsMovingPage from '../page-objects/about-the-movement/enterWhatIsMovingPage.js'
import howMuchAreYouMovingPage from '../page-objects/about-the-movement/howMuchAreYouMovingPage.js'
import whatIsMovingPage from '../page-objects/about-the-movement/whatIsMovingPage.js'
import checkAnswersPage from '../page-objects/about-the-movement/checkAnswersPage.js'
import animalTypePage from '../page-objects/about-the-movement/animalTypePage.js'
import animalPurposePage from '../page-objects/about-the-movement/animalPurposePage.js'
import animalIdPage from '../page-objects/about-the-movement/animalIdPage.js'
import animalsQuantityPage from '../page-objects/about-the-movement/animalsQuantityPage.js'
import movementTypePage from '../page-objects/about-the-movement/movementTypePage.js'

export const completeAboutMovementSection = async (
  onOffVisit,
  liveAnimals = true
) => {
  const movementTypes = {
    'onto-premises': whatIsMovingPage,
    'off-premises': whatIsMovingPage,
    visit: checkAnswersPage
  }

  const nextPage = movementTypes[onOffVisit] || checkAnswersPage
  await movementTypePage.selectRadioAndContinue(onOffVisit || 'visit', nextPage)

  if (onOffVisit === 'visit') {
    return
  }

  if (!liveAnimals) {
    await whatIsMovingPage.selectRadioAndContinue(
      'carcasses',
      enterWhatIsMovingPage
    )
    await enterWhatIsMovingPage.inputTextAndContinue(
      'snakes',
      howMuchAreYouMovingPage
    )
    await howMuchAreYouMovingPage.inputTextAndContinue(
      '45',
      describeWhatYouAreMovingPage
    )
    await describeWhatYouAreMovingPage.inputTextAndContinue(
      'description-test',
      checkAnswersPage
    )
    return
  }

  // For live animals
  await whatIsMovingPage.selectRadioAndContinue('live-animals', animalTypePage)
  await animalTypePage.selectRadioAndContinue('cattle', animalsQuantityPage)
  await animalsQuantityPage.inputTextAndContinue('9', animalPurposePage)
  await animalPurposePage.inputTextAndContinue('purpose', animalIdPage)
  await animalIdPage.inputTextAndContinue('animal id', checkAnswersPage)
}
