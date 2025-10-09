import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import earTagsOver42DaysOldPage from '../../page-objects/identification/earTagsOver42DaysOldPage.js'
import calvesPage from '../../page-objects/identification/calvesPage.js'

describe('Disinfectant page spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await earTagsOver42DaysOldPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await earTagsOver42DaysOldPage.singleInputErrorTest(
      '',
      earTagsOver42DaysOldPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await earTagsOver42DaysOldPage.inputTextAndContinue('ear tags', calvesPage)
  })
})
