import taskListPage from '../../page-objects/taskListPage.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import { waitForPagePath } from '../page.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import { navigateToTaskList } from './taskListNav.js'

const completeBiosecurityMapTask = async () => {
  await navigateToTaskList()
  await taskListPage.selectBiosecurityMapLink(mapUploadPage)

  await mapUploadPage.uploadFileAndContinue(
    'user-journey-tests/page-objects/biosecurity-map/assets/happy_emoji.jpg'
  )
  await waitForPagePath(biosecurityMapAnswersPage.pagePath)
}

export default completeBiosecurityMapTask
