import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import minimiseContaminationOtherPage from '../../page-objects/biosecurity/minimiseContaminationOtherPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'

describe('Buildings minimise contamination other measures page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await minimiseContaminationOtherPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await minimiseContaminationOtherPage.singleInputErrorTest(
      '',
      minimiseContaminationOtherPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await minimiseContaminationOtherPage.inputTextAndContinue(
      'Other measures information',
      peopleDisinfectionPage
    )
  })
})
