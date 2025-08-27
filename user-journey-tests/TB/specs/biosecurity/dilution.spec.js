import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'

describe('Disinfectant dilution page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
  })

  beforeEach(
    'Set the disinfectant and then go to dilution rate page',
    async () => {
      await disinfectantPage.navigateToPageAndVerifyTitle()
      await disinfectantPage.inputTextAndContinue(
        'Agrichlor',
        disinfectantDilutionPage
      )
      await disinfectantDilutionPage.navigateToPageAndVerifyTitle()
    }
  )

  it('Should verify that page errors when nothing is entered', async () => {
    await disinfectantDilutionPage.checkboxErrorTest()
  })

  it('Should input correct input and continue without error', async () => {
    await disinfectantDilutionPage.selectCheckboxesAndContinue(
      [disinfectantDilutionPage.dilutionRateConfirmed],
      anySharedBuildingsPage
    )
  })
})
