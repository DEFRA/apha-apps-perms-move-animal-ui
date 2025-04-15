import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import earTagsCalvesPage from '../../page-objects/identification/earTagsCalvesPage.js'
import animals42DaysOldOrOlderPage from '../../page-objects/identification/animals42DaysOldOrOlderPage.js'

describe('Ear tags calves - page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await earTagsCalvesPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await earTagsCalvesPage.singleInputErrorTest(
      '',
      earTagsCalvesPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await earTagsCalvesPage.inputTextAndContinue(
      'ear tags',
      animals42DaysOldOrOlderPage
    )
  })
})
