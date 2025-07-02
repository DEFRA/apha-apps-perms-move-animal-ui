import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../page.js'

export const navigateToTaskList = async () => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await waitForPagePath(taskListPage.pagePath)
}
