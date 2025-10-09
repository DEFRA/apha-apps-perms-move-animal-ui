import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/exotics/about-the-movement'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  movementType: {
    expected: 'Off a farm or premises',
    hrefSuffix: 'movement-type'
  },
  whatIsMoving: {
    expected: 'Carcasses',
    hrefSuffix: 'what-is-moving'
  },
  whatAreYouMoving: {
    expected: 'snakes',
    hrefSuffix: 'what-is-moving/enter-what-is-moving'
  },
  howMuchAreYouMoving: {
    expected: '45',
    hrefSuffix: 'what-is-moving/enter-what-is-moving/quantity'
  }
}

describe('About the movement - Off > carcasses', async () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
  })

  it('Runs the carcasses journey and checks answers and change links', async () => {
    await completeAboutMovementSection({
      onOffVisit: 'off-premises',
      liveAnimals: false
    })

    await checkAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage
    })
  })
})
