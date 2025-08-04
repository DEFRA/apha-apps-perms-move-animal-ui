import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/exotics/about-the-movement'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  movementType: {
    expected: 'Onto a farm or premises',
    hrefSuffix: 'movement-type'
  },
  whatIsMoving: {
    expected: 'Live animals',
    hrefSuffix: 'what-is-moving'
  },
  typeOfAnimal: {
    expected: 'Cattle',
    hrefSuffix: 'what-is-moving/select-animals'
  },
  numberOfAnimals: {
    expected: '9',
    hrefSuffix: 'what-is-moving/select-animals/quantity'
  },
  currentPurpose: {
    expected: 'purpose',
    hrefSuffix: 'what-is-moving/purpose'
  },
  animalIds: {
    expected: 'animal id',
    hrefSuffix: 'what-is-moving/id-numbers'
  }
}

describe('About the movement - Onto > Live animals > cattle', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Runs the cattle journey and checks answers and change links', async () => {
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectAboutMovement(movementTypePage)

    await completeAboutMovementSection('onto-premises', true)

    await checkAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )

    verifyCheckAnswersPage(journeyData, basePath, redirectUri, checkAnswersPage)

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Completed'
    })
  })
})
