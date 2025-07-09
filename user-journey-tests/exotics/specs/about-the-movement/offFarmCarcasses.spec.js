import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import describeWhatYouAreMovingPage from '../../page-objects/about-the-movement/describeWhatYouAreMovingPage.js'
import enterWhatIsMovingPage from '../../page-objects/about-the-movement/enterWhatIsMovingPage.js'
import howMuchAreYouMovingPage from '../../page-objects/about-the-movement/howMuchAreYouMovingPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import whatIsMovingPage from '../../page-objects/about-the-movement/whatIsMovingPage.js'

const basePath = '/exotics/about-the-movement'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  movementType: {
    input: 'off-premises',
    expected: 'Off a farm or premises',
    hrefSuffix: 'movement-type'
  },
  whatIsMoving: {
    input: 'carcasses',
    expected: 'Carcasses',
    hrefSuffix: 'what-is-moving'
  },
  whatAreYouMoving: {
    input: 'snakes',
    expected: 'snakes',
    hrefSuffix: 'what-is-moving/enter-what-is-moving'
  },
  howMuchAreYouMoving: {
    input: '45',
    expected: '45',
    hrefSuffix: 'what-is-moving/enter-what-is-moving/quantity'
  },
  describeWhatYouAreMoving: {
    input: 'description-test',
    expected: 'description-test',
    hrefSuffix: 'what-is-moving/enter-what-is-moving/description'
  }
}

const getInput = (key) => journeyData[key].input ?? journeyData[key]
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
    await movementTypePage.selectRadioAndContinue(
      getInput('movementType'),
      whatIsMovingPage
    )
    await whatIsMovingPage.selectRadioAndContinue(
      getInput('whatIsMoving'),
      enterWhatIsMovingPage
    )
    await enterWhatIsMovingPage.inputTextAndContinue(
      getInput('whatAreYouMoving'),
      howMuchAreYouMovingPage
    )
    await howMuchAreYouMovingPage.inputTextAndContinue(
      getInput('howMuchAreYouMoving'),
      describeWhatYouAreMovingPage
    )
    await describeWhatYouAreMovingPage.inputTextAndContinue(
      getInput('describeWhatYouAreMoving'),
      checkAnswersPage
    )

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
