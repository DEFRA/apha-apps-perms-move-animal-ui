import { browser, expect } from '@wdio/globals'

import landingPage from '~/test/page-objects/landingPage'
import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import { loadPageAndVerifyTitle } from '~/test/helpers/page'

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
    await expect(browser).toHaveTitle(toFromFarmPage.toFromFarmTitle)
    await toFromFarmPage.verifyPageHeading(toFromFarmPage.toFromFarmTitle)
    await toFromFarmPage.selectBackLink()

    await landingPage.verifyStartNowButton('Start now')
  })
})
