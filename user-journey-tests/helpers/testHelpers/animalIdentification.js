import earTagsPage from '../../page-objects/identification/earTagsPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { navigateToTaskList } from './taskListNav.js'

// Helper function to complete the origin task
const completeAnimalIdentificationTask = async () => {
  await navigateToTaskList()
  await taskListPage.selectAnimalIdentificationLink(earTagsPage)
  await earTagsPage.inputEarTagsAndContinue(
    '12345678',
    identificationAnswersPage
  )
}

export default completeAnimalIdentificationTask
