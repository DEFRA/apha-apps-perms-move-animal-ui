import { browser, expect } from '@wdio/globals'

import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import { loadPageAndVerifyTitle } from '~/test/helpers/page'
import parishHoldingNumberPage from '../page-objects/parishHoldingNumberPage'
import exitPage from '../page-objects/exitPage'

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
    await expect(parishHoldingNumberPage.cphNumberInput).toBeDisplayed()
    await parishHoldingNumberPage.verifyPageHeading(
      parishHoldingNumberPage.parishHoldingTitle
    )
    await browser.back()
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
