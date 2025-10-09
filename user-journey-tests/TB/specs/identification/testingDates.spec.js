import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'
import earTagsOver42DaysOldPage from '../../page-objects/identification/earTagsOver42DaysOldPage.js'

describe('Disinfectant page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await testingDatesPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await testingDatesPage.singleInputErrorTest(
      '',
      testingDatesPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await testingDatesPage.inputTextAndContinue(
      '21/09/1995',
      earTagsOver42DaysOldPage
    )
  })
})
