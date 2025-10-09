import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import maximumAnimalsPage from '../../page-objects/destination/maximumAnimalsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('How many animals page spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await maximumAnimalsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await maximumAnimalsPage.singleInputErrorTest(
      '',
      maximumAnimalsPage.noInputError
    )
  })

  it('Should verify that page errors when something other than a number is entered', async () => {
    await maximumAnimalsPage.singleInputErrorTest(
      'test',
      maximumAnimalsPage.invalidFormatError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await maximumAnimalsPage.inputTextAndContinue('550', reasonForMovementPage)
  })
})
