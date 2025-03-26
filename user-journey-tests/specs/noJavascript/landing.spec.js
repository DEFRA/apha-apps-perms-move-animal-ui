import { browser } from '@wdio/globals'

import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Javascript disabled test', () => {
  beforeEach('Log in and navigate to landing page', async () => {
    await signInPage.signInUsingTestCredentials()
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the back link isn’t visible when JavaScript is disabled', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await expect(browser).toHaveTitle(taskListPage.pageTitle)
    await taskListPage.verifyPageHeadingAndTitle()
    expect(await taskListPage.getBackLink().isDisplayed()).toBe(false)
  })
})
