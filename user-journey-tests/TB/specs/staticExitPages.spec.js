import { browser } from '@wdio/globals'
import { staticExitPages } from '../page-objects/staticExitPages.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../helpers/authSessionManager.js'
import signInPage from '../page-objects/signInPage.js'
import landingPage from '../page-objects/landingPage.js'

// These checks inspect existing information pages without submitting an application.
describe('Static exit page translations', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and clear the language preference', async () => {
    await landingPage.open('/')
    await restoreSession()
    await browser.deleteCookies('language')
  })

  afterEach('Clear the language preference', async () => {
    await browser.deleteCookies('language')
  })

  for (const page of staticExitPages) {
    it(`should translate ${page.pagePath} and restore English`, async () => {
      await page.navigateToPageAndVerifyTitle(false)
      await page.verifyWelshAndEnglishTranslations()
    })
  }
})
