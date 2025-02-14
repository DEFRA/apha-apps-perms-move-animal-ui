import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import mapUploadPage from '../../page-objects/biosecurity-map/mapUploadPage.js'
import { waitForPagePath } from '../page.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'

const completeBiosecurityMapTask = async () => {
  await landingPage.navigateToPageAndVerifyTitle()
  await landingPage.verifyStartNowButton('Start now', true)
  await taskListPage.selectBiosecurityMapLink()
  await waitForPagePath(mapUploadPage.pagePath)
  await mapUploadPage.uploadFileAndContinue('./happy_emoji.jpg')
  await waitForPagePath(biosecurityMapAnswersPage.pagePath)
}

export default completeBiosecurityMapTask
