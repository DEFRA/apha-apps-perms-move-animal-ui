import howManyAnimalsPage from '../../page-objects/destination/howManyAnimalsPage.js'
import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('How many animals page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await howManyAnimalsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await howManyAnimalsPage.singleInputErrorTest(
      '',
      howManyAnimalsPage.noInputError
    )
  })

  it('Should verify that page errors when something other than a number is entered', async () => {
    await howManyAnimalsPage.singleInputErrorTest(
      'test',
      howManyAnimalsPage.invalidFormatError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await howManyAnimalsPage.inputTextAndContinue('550', reasonForMovementPage)
  })
})
