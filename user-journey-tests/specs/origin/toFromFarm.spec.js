import { browser, expect } from '@wdio/globals'

import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import exitPage from '../../page-objects/origin/exitPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'

describe('To from farm page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.toFromFarmErrorTest()
  })

  it('Should select on the farm radio and continue', async () => {
    await toFromFarmPage.selectOnFarmAndContinue()
    await expect(toFromFarmPage.pageError).not.toBeDisplayed()
    await expect(toFromFarmPage.errorSummary).not.toBeDisplayed()
    await exitPage.verifyPageHeadingAndTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue()
    await originTypePage.verifyPageHeadingAndTitle()
    await browser.back()
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
