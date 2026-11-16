import { browser } from '@wdio/globals'
import landingPage from '../../page-objects/landingPage.js'

describe('Landing page test without JavaScript', () => {
  beforeEach('Navigate to page', async () => {
    await landingPage.open('/')
    await browser.deleteCookies('language')
    await landingPage.navigateToPageAndVerifyTitle()
  })

  afterEach('Clear the language preference', async () => {
    await browser.deleteCookies('language')
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
