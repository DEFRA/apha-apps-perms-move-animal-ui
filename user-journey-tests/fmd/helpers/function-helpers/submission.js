import taskListPage from '../../page-objects/taskListPage.js'
import reviewPage from '../../page-objects/reviewPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import confirmationPage from '../../page-objects/confirmationPage.js'

export const submitAndVerifyApplication = async () => {
  await taskListPage.navigateToPageAndVerifyTitle()
  await taskListPage.selectReview()
  await waitForPagePath(reviewPage.pagePath)
  await reviewPage.selectADeclarationAndContinue()
  await waitForPagePath(confirmationPage.pagePath)
}
