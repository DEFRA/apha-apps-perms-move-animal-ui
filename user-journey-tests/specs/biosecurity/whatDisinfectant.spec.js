import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'
import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Disinfectant page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await disinfectantPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the disinfectant link', async () => {
    await disinfectantPage.verifyDisinfectantGovLink()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await disinfectantPage.singleInputErrorTest(
      '',
      disinfectantPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await disinfectantPage.inputTextAndContinue(
      'Batman disinfectant',
      disinfectantDilutionPage
    )
  })
})
