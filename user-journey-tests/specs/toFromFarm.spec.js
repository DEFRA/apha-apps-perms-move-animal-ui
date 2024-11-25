import { browser, expect } from '@wdio/globals'

import toFromFarmPage from '../page-objects/toFromFarmPage.js'
import { loadPageAndVerifyTitle } from '../helpers/page.js'
import parishHoldingNumberPage from '../page-objects/parishHoldingNumberPage.js'
import exitPage from '../page-objects/exitPage.js'

describe('To from farm page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      toFromFarmPage.urlPath,
      toFromFarmPage.toFromFarmTitle
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
    await exitPage.verifyPageHeading(exitPage.exitPageHeading)
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue()
    await expect(parishHoldingNumberPage.cphNumberInput()).toBeDisplayed()
    await parishHoldingNumberPage.verifyPageHeading(
      parishHoldingNumberPage.parishHoldingTitle
    )
    await browser.back()
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
