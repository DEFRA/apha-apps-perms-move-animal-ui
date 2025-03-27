import { browser } from '@wdio/globals'

import landingPage from '../../page-objects/landingPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Javascript disabled test', () => {
  beforeEach('Reset browser state and navigate to landing page', async () => {
    await browser.reloadSession()
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the back link isnt visble when javascript is disabled', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await expect(browser).toHaveTitle(taskListPage.pageTitle)
    await taskListPage.verifyPageHeadingAndTitle()
    expect(await taskListPage.getBackLink().isDisplayed()).toBe(false)
  })
})
