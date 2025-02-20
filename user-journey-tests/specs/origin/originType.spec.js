import { browser, expect } from '@wdio/globals'

import originTypePage from '../../page-objects/origin/originTypePage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import { loadPageAndVerifyTitle, waitForPagePath } from '../../helpers/page.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'

describe('origin type page test (off farm)', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await originTypePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await originTypePage.originTypeErrorTest()
  })

  it('Should verify that off farm versions are visible (if off farm was previously selected)', async () => {
    await originTypePage.navigateToPageAndVerifyTitle()
    await originTypePage.verifyOffFarmVersion()
  })

  it('Should verify that off farm versions are visible (if on farm was previously selected)', async () => {
    await toFromFarmPage.navigateToPageAndVerifyTitle()
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.navigateToPageAndVerifyTitle()
    await originTypePage.verifyOnFarmVersion()
  })

  it('Should select tb restricted farm and continue', async () => {
    await originTypePage.selectTBRestrictedFarmAndContinue(
      parishHoldingNumberPage
    )
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
  })

  it('Should select afu and continue', async () => {
    await originTypePage.selectApprovedFinishingUnitAndContinue(
      parishHoldingNumberPage
    )
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
  })

  it('Should select another type of premises and continue', async () => {
    await originTypePage.selectAnotherTypeOfPremisesAndContinue(
      parishHoldingNumberPage
    )
  })

  it('Should choose an option and check its maintained', async () => {
    await originTypePage.selectApprovedFinishingUnitAndContinue(
      parishHoldingNumberPage
    )
    await parishHoldingNumberPage.verifyPageHeadingAndTitle()
    await browser.back()

    await browser.refresh()
    await waitForPagePath(originTypePage.pagePath)

    await expect(originTypePage.approvedFinishingUnitRadio).toBeSelected()
  })
})
