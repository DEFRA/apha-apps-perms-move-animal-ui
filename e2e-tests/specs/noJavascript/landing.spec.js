import { browser } from '@wdio/globals'

import landingPage from '../page-objects/landingPage'
import toFromFarmPage from '../page-objects/toFromFarmPage'
import { loadPageAndVerifyTitle } from '../helpers/page'

describe('Javascript disabled test', () => {
  beforeEach('Reset browser state and navigate to landing page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.landingPageTitleText)
  })

  it('Should verify that the back link isnt visble when javascript is disabled', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await expect(browser).toHaveTitle(toFromFarmPage.toFromFarmTitle)
    await toFromFarmPage.verifyPageHeading(
      'Are you moving the cattle on or off your farm or premises?'
    )
    await expect(await toFromFarmPage.backLink.isDisplayed()).toBe(false)
  })
})
