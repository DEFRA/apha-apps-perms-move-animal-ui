import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import checkAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/about-the-movement-or-activity'
const redirectUri = '/fmd/about-the-movement/check-answers'

const journeyData = {
  movementType: {
    expected: 'Movement on to a farm or premises',
    hrefSuffix: 'type'
  },
  whatIsMoving: { expected: 'Live animals', hrefSuffix: 'what-is-moving' },
  toSlaughter: { expected: 'Yes', hrefSuffix: 'slaughter-yes-no' },
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

describe('About the movement - Onto → Live animals → to slaughter', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Runs the live animals to slaughter journey and checks answers and change links', async () => {
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.selectAboutMovement(movementTypePage)

    await completeAboutMovement({
      movementContext: 'on-to-farm',
      moving: 'live-animals',
      toSlaughter: true,
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
