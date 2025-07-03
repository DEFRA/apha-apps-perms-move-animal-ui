import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherDestinationTypePage from '../../page-objects/destination/otherDestinationTypePage.js'
import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'

describe('Destination type other page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await otherDestinationTypePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await otherDestinationTypePage.singleInputErrorTest(
      '',
      otherDestinationTypePage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await otherDestinationTypePage.inputTextAndContinue(
      'Other origin type',
      destinationCPHPage
    )
  })
})
