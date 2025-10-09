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
    expected: 'Slaughter of animals onsite',
    hrefSuffix: 'type'
  },
  animalSlaughtered: {
    expected: 'Cattle',
    hrefSuffix: 'animal-being-slaughtered'
  },
  slaughteredNumber: {
    expected: '8',
    hrefSuffix: 'number-of-animals-slaughtered'
  },
  slaughterId: {
    expected: 'UK123456 00001, UK123456 00002',
    hrefSuffix: 'ID-number-slaughter'
  }
}

describe('About the movement - Slaughter on site → Live animals → cattle', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Runs the slaughter-on-site journey and checks answers and change links', async () => {
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'About the movement',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.selectAboutMovement(movementTypePage)

    await completeAboutMovement({
      movementContext: 'slaughter-onsite',
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
