import { loadPageAndVerifyTitle, waitForUrlPath } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'
import toFromFarmPage from '../page-objects/origin/toFromFarmPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import emailPage from '../page-objects/receiving-the-licence/emailPage.js'
import taskListIncompletePage from '../page-objects/taskListIncompletePage.js'
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

    expect(await taskListPage.getTaskToCompleteCount()).toBe('4 out of 4')
  })

  it('should link to movement origin first question before an application has been started', async () => {
    await taskListPage.selectMovementOrigin()
    await toFromFarmPage.verifyPageHeading(toFromFarmPage.toFromFarmTitle)
  })

  it('should link to receiving the licence first question before an application has been started', async () => {
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
    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Movement destination',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Test',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Incomplete'
    })

    expect(await taskListPage.getTaskToCompleteCount()).toBe('3 out of 4')

    await taskListPage.selectMovementOrigin()
    await checkAnswersPage.verifyPageHeading(checkAnswersPage.checkAnswersTitle)
    await waitForUrlPath(checkAnswersPage.checkAnswersUrlPath)
  })

  it(`should route the user to task incomplete page if they haven't completed the user journey`, async () => {
    await taskListPage.selectReview()
    await taskListIncompletePage.verifyPageHeading(
      taskListIncompletePage.taskListIncompletePageTitle
    )
  })
})
