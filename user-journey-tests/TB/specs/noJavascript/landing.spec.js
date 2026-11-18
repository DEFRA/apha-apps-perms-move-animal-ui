import { browser } from '@wdio/globals'
import landingPage from '../../page-objects/landingPage.js'
import cookiesPage from '../../page-objects/cookiesPage.js'
import privacyPage from '../../page-objects/privacyPage.js'
import accessibilityStatementPage from '../../page-objects/accessibilityStatementPage.js'

describe('Landing page test without JavaScript', () => {
  beforeEach('Navigate to page', async () => {
    await landingPage.open('/')
    await browser.deleteCookies('language')
    await landingPage.navigateToPageAndVerifyTitle()
  })

  afterEach('Clear the language preference', async () => {
    await browser.deleteCookies('language')
  })

  it('Should verify Welsh Cookies translations and restore English without JavaScript', async () => {
    await cookiesPage.verifyWelshAndEnglishTranslations()
  })

  it('Should verify Welsh Privacy translations and restore English without JavaScript', async () => {
    await privacyPage.verifyWelshAndEnglishTranslations()
  })

  it('Should verify Welsh Accessibility translations and restore English without JavaScript', async () => {
    await accessibilityStatementPage.verifyWelshAndEnglishTranslations()
  })

  it('shows the landing page content', async () => {
    await landingPage.verifyPageHeadingAndTitle()
    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify Welsh content and restore English using the language links without JavaScript', async () => {
    await landingPage.selectWelshAndVerifyContent()
    await landingPage.selectEnglishAndVerifyContent()
  })
})
