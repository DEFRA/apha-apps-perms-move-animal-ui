import { loadPageAndVerifyTitle } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'

describe('Task list page test', () => {
  beforeEach('Navigate to task list page', async () => {
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
})
