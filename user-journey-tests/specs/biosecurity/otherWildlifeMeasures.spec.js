import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherWildlifeMeasuresPage from '../../page-objects/biosecurity/otherWildlifeMeasuresPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

describe('Minimise contamination page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await otherWildlifeMeasuresPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await otherWildlifeMeasuresPage.singleInputErrorTest(
      '',
      otherWildlifeMeasuresPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await otherWildlifeMeasuresPage.inputTextAndContinue(
      'Other measures',
      keptSeparatelyPage
    )
  })
})
