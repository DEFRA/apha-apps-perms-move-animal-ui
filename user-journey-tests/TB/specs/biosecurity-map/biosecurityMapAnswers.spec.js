import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import completeBiosecurityMapTask from '../../helpers/testHelpers/biosecurityMap.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

describe('Check your answers test - biosecurity map', () => {
  
  before('Sign in and complete answers', async () => {
    await loginAndSaveSession(signInPage)
    await completeBiosecurityMapTask(true)
    await biosecurityMapAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the value and href of biosecurity map row', async () => {
    await validateElementVisibleAndText(
      await biosecurityMapAnswersPage.getValue('biosecMap'),
      'Map uploaded'
    )
    await validateHrefOfElement(
      await biosecurityMapAnswersPage.getChangeLink('biosecMap'),
      '/biosecurity-map/upload-plan?redirect_uri=/biosecurity-map/check-answers'
    )
  })

  it('Should verify continue takes you to task list', async () => {
    await biosecurityMapAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
