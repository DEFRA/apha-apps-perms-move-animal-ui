import { loadPageAndVerifyTitle } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'
import taskListIncompletePage from '../page-objects/taskListIncompletePage.js'

describe('Task list page test', () => {
  beforeEach('Navigate to task list page', async () => {
    await loadPageAndVerifyTitle(
      taskListIncompletePage.pagePath,
      taskListIncompletePage.pageTitle
    )
  })

  it('should allow the user to return to the task list', async () => {
    await taskListIncompletePage.selectGoToApplication()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
