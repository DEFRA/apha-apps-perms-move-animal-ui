import earTagsPage from '../../page-objects/identification/earTagsPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { waitForPagePath } from '../page.js'

// Helper function to complete the origin task
const completeAnimalIdentificationTask = async (radioType) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectAnimalIdentificationLink()
  await waitForPagePath(earTagsPage.pagePath)
  await earTagsPage.inputEarTagsAndContinue(
    '12345678',
    identificationAnswersPage
  )
}

export default completeAnimalIdentificationTask
