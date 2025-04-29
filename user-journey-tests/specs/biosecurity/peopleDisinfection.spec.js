import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'

describe('People disinfection method page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await peopleDisinfectionPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await peopleDisinfectionPage.singleInputErrorTest(
      '',
      peopleDisinfectionPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await peopleDisinfectionPage.inputTextAndContinue(
      'By testing it',
      biosecBadgersPage
    )
  })
})
