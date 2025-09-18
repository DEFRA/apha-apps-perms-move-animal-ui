import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementFromDiagram } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/about-the-movement-or-activity'
const redirectUri = `/fmd/about-the-movement/check-answers`

const journeyData = {
  movementType: {
    expected: 'Movement off a farm or premises',
    hrefSuffix: 'type'
  },
  whatIsMoving: { expected: 'Milk', hrefSuffix: 'what-is-moving' },
  milkResponsible: {
    expected: 'Yes',
    hrefSuffix: 'responsibility-for-movement'
  },
  milkAnimal: { expected: 'Cow', hrefSuffix: 'animal-the-milk-is-from' }
}

describe('About the movement - Off premises → Milk', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Runs the milk movement journey and checks answers and change links', async () => {
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.selectAboutMovement(movementTypePage)

    await completeAboutMovementFromDiagram({
      movementContext: 'off-of-farm',
      moving: 'milk',
      milkResponsible: true,
      startFromFirstPage: true
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

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Completed'
    })
  })
})
