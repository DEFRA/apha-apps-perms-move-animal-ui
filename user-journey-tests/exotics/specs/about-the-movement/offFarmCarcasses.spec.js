import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'

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

const getExpected = (key) => journeyData[key].expected ?? journeyData[key]
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('About the movement - Off > carcasses', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
  })

  it('Runs the carcasses journey and checks answers and change links', async () => {
    await completeAboutMovementSection('off-premises', false) // ⬅️ Shared helper function

    await checkAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )

    for (const key of Object.keys(journeyData)) {
      const valueEl = await checkAnswersPage.getValue(key)
      const changeLink = await checkAnswersPage.getChangeLink(key)

      await expect(valueEl).toHaveTextContaining(getExpected(key))
      await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
    }
  })
})
