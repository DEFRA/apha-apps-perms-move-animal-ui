import { browser } from '@wdio/globals'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Separated grazing page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await howFieldSeparatedPage.open('/')
    await browser.deleteCookies('language')
    await restoreSession()
    await howFieldSeparatedPage.navigateToPageAndVerifyTitle()
  })

  afterEach('Clear the language preference', async () => {
    await browser.deleteCookies('language')
  })

  it('Should verify representative Welsh checkbox text and restore English', async () => {
    await howFieldSeparatedPage.verifyWelshAndEnglishTranslations()
  })

  it('Should select checkbox input and continue without error', async () => {
    await howFieldSeparatedPage.selectCheckboxesAndContinue(
      [howFieldSeparatedPage['separated-by-roads']],
      manureDetailsPage
    )
  })
})
