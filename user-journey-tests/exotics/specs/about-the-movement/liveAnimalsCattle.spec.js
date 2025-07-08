import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import animalIdPage from '../../page-objects/about-the-movement/animalIdPage.js'
import animalPurposePage from '../../page-objects/about-the-movement/animalPurposePage.js'
import NumberOfAnimalsPage from '../../page-objects/about-the-movement/animalsQuantityPage.js'
import animalTypePage from '../../page-objects/about-the-movement/animalTypePage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import whatIsMovingPage from '../../page-objects/about-the-movement/whatIsMovingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page'

const basePath = '/exotics/about-the-movement'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  movementType: {
    input: 'onto-premises',
    expected: 'Onto a farm or premises',
    hrefSuffix: 'movement-type'
  },
  whatIsMoving: {
    input: 'live-animals',
    expected: 'Live animals',
    hrefSuffix: 'what-is-moving'
  },
  typeOfAnimal: {
    input: 'cattle',
    expected: 'Cattle',
    hrefSuffix: 'what-is-moving/select-animals'
  },
  numberOfAnimals: {
    input: '9',
    expected: '9',
    hrefSuffix: 'what-is-moving/select-animals/quantity'
  },
  currentPurpose: {
    input: 'purpose',
    expected: 'purpose',
    hrefSuffix: 'what-is-moving/purpose'
  },
  animalIds: {
    input: 'animal id',
    expected: 'animal id',
    hrefSuffix: 'what-is-moving/id-numbers'
  }
}

const getInput = (key) => journeyData[key].input ?? journeyData[key]
const getExpected = (key) => journeyData[key].expected ?? journeyData[key]
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('About the movement - Onto > Live animals > cattle', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Runs the cattle journey and checks answers and change links', async () => {
    await taskListPage.selectAboutMovement(movementTypePage)
    await movementTypePage.selectRadioAndContinue(
      getInput('movementType'),
      whatIsMovingPage
    )
    await whatIsMovingPage.selectRadioAndContinue(
      getInput('whatIsMoving'),
      animalTypePage
    )
    await animalTypePage.selectRadioAndContinue(
      getInput('typeOfAnimal'),
      NumberOfAnimalsPage
    )
    await NumberOfAnimalsPage.inputTextAndContinue(
      getInput('numberOfAnimals'),
      animalPurposePage
    )
    await animalPurposePage.inputTextAndContinue(
      getInput('currentPurpose'),
      animalIdPage
    )
    await animalIdPage.inputTextAndContinue(
      getInput('animalIds'),
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

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Completed'
    })
  })
})
