import { expect } from '@wdio/globals'

import originCountryPage from '../../page-objects/origin/originCountryPage.js'
import importParishPage from '../../page-objects/origin/importParishPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Country of import test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to country page', async () => {
    await restoreSession()
    await originCountryPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await originCountryPage.singleInputErrorTest(
      '',
      originCountryPage.noInputError
    )
  })

  it('Should verify that page errors when too much text is entered', async () => {
    const longString = new Array(256).fill('a').join('')
    await originCountryPage.singleInputErrorTest(
      longString,
      originCountryPage.invalidFormatError
    )
  })

  it('Should input country and continue without producing an error', async () => {
    await originCountryPage.inputTextAndContinue('France', importParishPage)
    await expect(originCountryPage.inputFieldError()).not.toBeDisplayed()
    await expect(originCountryPage.errorSummary).not.toBeDisplayed()
  })
})
