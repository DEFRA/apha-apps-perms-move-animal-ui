import landingPage from '../../page-objects/landingPage'
import taskListPage from '../../page-objects/taskListPage'
import { waitForPagePath } from '../page'

export const navigateToTaskList = async () => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await waitForPagePath(taskListPage.pagePath)
}
