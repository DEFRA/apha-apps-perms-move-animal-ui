import { browser, expect } from '@wdio/globals'

import originTypePage from '../../page-objects/origin/originTypePage.js'
import { loadPageAndVerifyTitle, waitForPagePath } from '../../helpers/page.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import originTypeExitPage from '../../page-objects/origin/originTypeExitPage.js'

describe('origin type page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      originTypePage.pagePath,
      originTypePage.pageTitle
    )
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await originTypePage.originTypeErrorTest()
  })

  it('Should select tb restricted farm and continue', async () => {
    await originTypePage.selectTBRestrictedFarmAndContinue()
    await expect(originTypePage.pageError).not.toBeDisplayed()
    await expect(originTypePage.errorSummary).not.toBeDisplayed()
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
  })

  it('Should select afu and continue', async () => {
    await originTypePage.selectApprovedFinishingUnitAndContinue()
    await expect(originTypePage.pageError).not.toBeDisplayed()
    await expect(originTypePage.errorSummary).not.toBeDisplayed()
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
  })

  it('Should select another type of premises and continue', async () => {
    await originTypePage.selectAnotherTypeOfPremisesAndContinue()
    await expect(originTypePage.pageError).not.toBeDisplayed()
    await expect(originTypePage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(originTypeExitPage.pagePath)
  })

  it('Should choose an option and check its maintained', async () => {
    await originTypePage.selectApprovedFinishingUnitAndContinue()
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
    await browser.back()

    await browser.refresh()
    await waitForPagePath(originTypePage.pagePath)

    await expect(originTypePage.approvedFinishingUnitRadio).toBeSelected()
  })
})
