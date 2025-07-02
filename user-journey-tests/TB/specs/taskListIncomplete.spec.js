import taskListPage from '../page-objects/taskListPage.js'
import taskListIncompletePage from '../page-objects/taskListIncompletePage.js'
import signInPage from '../page-objects/signInPage.js'
import { loginAndSaveSession } from '../helpers/authSessionManager.js'

describe('Task list page test', () => {
  beforeEach(async () => {
    await loginAndSaveSession(signInPage)
    await taskListIncompletePage.navigateToPageAndVerifyTitle()
  })

  it('should allow the user to return to the task list', async () => {
    await taskListIncompletePage.selectGoToApplication()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
