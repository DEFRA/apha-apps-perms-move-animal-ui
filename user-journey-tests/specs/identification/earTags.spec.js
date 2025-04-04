import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import earTagsPage from '../../page-objects/identification/earTagsPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'

describe('Disinfectant page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await earTagsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await earTagsPage.singleInputErrorTest('', earTagsPage.noInputError)
  })

  it('Should input correct input and continue without error', async () => {
    await earTagsPage.inputTextAndContinue(
      'ear tags',
      identificationAnswersPage
    )
  })
})
