import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'

describe('Disinfectant dilution page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await disinfectantDilutionPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the disinfectant link', async () => {
    await disinfectantDilutionPage.verifyDilutionGovLink()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await disinfectantDilutionPage.singleInputErrorTest(
      '',
      disinfectantDilutionPage.noInputError
    )
  })

  it('Should verify that page errors when something other than a number is entered', async () => {
    await disinfectantDilutionPage.singleInputErrorTest(
      'test',
      disinfectantDilutionPage.invalidFormatError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await disinfectantDilutionPage.inputTextAndContinue(
      '1995',
      anySharedBuildingsPage
    )
  })
})
