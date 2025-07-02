import taskListPage from '../../page-objects/taskListPage.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import { waitForPagePath } from '../page.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import { navigateToTaskList } from './taskListNav.js'

const completeBiosecurityMapTask = async (direct = false) => {
  if (!direct) {
    await navigateToTaskList()
    await taskListPage.selectBiosecurityMapLink(mapUploadPage)
  } else {
    await mapUploadPage.navigateToPageAndVerifyTitle()
  }

  await mapUploadPage.uploadFileAndContinue(
    'user-journey-tests/TB/page-objects/biosecurity-map/assets/happy_emoji.jpg'
  )
  await waitForPagePath(biosecurityMapAnswersPage.pagePath)
}

export default completeBiosecurityMapTask
