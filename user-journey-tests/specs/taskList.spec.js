import { loadPageAndVerifyTitle, waitForUrlPath } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'
import toFromFarmPage from '../page-objects/origin/toFromFarmPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import emailPage from '../page-objects/receiving-the-licence/emailPage.js'
import { completeOriginTaskAnswers } from '../helpers/testHelpers/movementLicense.js'

describe('Task list page test', () => {
  beforeEach('Navigate to task list page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      taskListPage.taskListPageUrlPath,
      taskListPage.taskListPageTitle
    )
  })

  it('should display the correct statuses before an application has been started', async () => {
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Movement destination',
      expectedStatus: 'Cannot start yet'
    })
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Test',
      expectedStatus: 'Cannot start yet'
    })
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Incomplete'
    })
  })

  it('should link to movement origin first question before an application has been started', async () => {
    await taskListPage.selectMovementOrigin()
    await toFromFarmPage.verifyPageHeading(toFromFarmPage.toFromFarmTitle)
  })

  it('should link to task complete', async () => {
    await taskListPage.selectReceiveTheLicence()
    await waitForUrlPath(emailPage.emailPageUrlPath)
  })

  it('should link to movement origin summary once that selection has been completed', async () => {
    await completeOriginTaskAnswers()
    await loadPageAndVerifyTitle(
      taskListPage.taskListPageUrlPath,
      taskListPage.taskListPageTitle
    )
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
    await taskListPage.selectMovementOrigin()
    await checkAnswersPage.verifyPageHeading(checkAnswersPage.checkAnswersTitle)
    await waitForUrlPath(checkAnswersPage.checkAnswersUrlPath)
  })
})
