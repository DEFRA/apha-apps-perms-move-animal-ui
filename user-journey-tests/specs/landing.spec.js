import { browser, expect } from '@wdio/globals'

import landingPage from '../page-objects/landingPage.js'
import toFromFarmPage from '../page-objects/toFromFarmPage.js'
import { loadPageAndVerifyTitle } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'

describe('Landing page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.landingPageTitleText)
  })

  it('Should verify start now button visible on landing page', async () => {
    await landingPage.verifyPrivateBetaBanner()
    await landingPage.verifyPageHeading(landingPage.landingPageTitleText)
    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify that start now navigates you to first question and back link returns you', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await expect(browser).toHaveTitle(taskListPage.taskListPageTitle)
    await taskListPage.verifyPageHeading(taskListPage.taskListPageHeading)
    await taskListPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now')
  })
})
