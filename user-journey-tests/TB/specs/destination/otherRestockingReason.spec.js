import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherRestockingReasonPage from '../../page-objects/destination/otherRestockingReasonPage.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'

describe('Other restocking reason page spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await otherRestockingReasonPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await otherRestockingReasonPage.singleInputErrorTest(
      '',
      otherRestockingReasonPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await otherRestockingReasonPage.inputTextAndContinue(
      'Other restocking reason',
      additionalInfoPage
    )
  })
})
