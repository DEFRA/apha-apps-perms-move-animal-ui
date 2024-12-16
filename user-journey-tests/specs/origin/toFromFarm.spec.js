import { browser, expect } from '@wdio/globals'

import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import { loadPageAndVerifyTitle } from '../../helpers/page.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import exitPage from '../../page-objects/origin/exitPage.js'

describe('To from farm page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      toFromFarmPage.pagePath,
      toFromFarmPage.pageTitle
    )
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.toFromFarmErrorTest(
      toFromFarmPage.toFromFarmErrorMessage
    )
  })

  it('Should select on the farm radio and continue (currently no where)', async () => {
    await toFromFarmPage.selectOnFarmAndContinue()
    await expect(toFromFarmPage.pageError).not.toBeDisplayed()
    await expect(toFromFarmPage.errorSummary).not.toBeDisplayed()
    await exitPage.verifyPageHeadingAndTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue()
    await expect(parishHoldingNumberPage.cphNumberInput()).toBeDisplayed()
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
    await browser.back()
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
