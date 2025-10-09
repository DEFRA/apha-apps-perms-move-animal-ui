import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/about-the-movement-or-activity'
const redirectUri = `/fmd/about-the-movement/check-answers`

const journeyData = {
  movementType: {
    expected: 'Movement off a farm or premises',
    hrefSuffix: 'type'
  },
  whatIsMoving: {
    expected: 'Carcasses (dead animals)',
    hrefSuffix: 'what-is-moving'
  },
  typeOfAnimal: {
    expected: 'Cattle',
    hrefSuffix: 'animal-type'
  },
  numberOfAnimals: {
    expected: '8',
    hrefSuffix: 'number-of-animals'
  },
  animalIds: {
    expected: 'UK123456 00001, UK123456 00002',
    hrefSuffix: 'ID-number'
  }
}

describe('About the movement - Off premises → Carcasses', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Runs the off-premises carcasses journey and checks answers and change links', async () => {
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.selectAboutMovement(movementTypePage)

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'carcasses',
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
