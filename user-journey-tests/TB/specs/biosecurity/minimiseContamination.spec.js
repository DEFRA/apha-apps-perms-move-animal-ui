import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import buildingsMinimiseContiaminationPage from '../../page-objects/biosecurity/buildingsMinimiseContiaminationPage.js'

describe('Minimise contamination page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await buildingsMinimiseContiaminationPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await buildingsMinimiseContiaminationPage.checkboxErrorTest()
  })

  it('Should input correct input and continue without error', async () => {
    await buildingsMinimiseContiaminationPage.selectCheckboxesAndContinue(
      [buildingsMinimiseContiaminationPage.cleaning],
      peopleDisinfectionPage
    )
  })
})
