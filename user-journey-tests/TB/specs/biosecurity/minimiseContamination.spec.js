import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Minimise contamination page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await minimiseContaminationPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await minimiseContaminationPage.singleInputErrorTest(
      '',
      minimiseContaminationPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await minimiseContaminationPage.inputTextAndContinue(
      'By testing it',
      sharedEquipmentPage
    )
  })
})
