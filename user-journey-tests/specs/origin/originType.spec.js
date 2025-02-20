import { browser, expect } from '@wdio/globals'

import originTypePage from '../../page-objects/origin/originTypePage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import { waitForPagePath } from '../../helpers/page.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import fiftyPercentPage from '../../page-objects/origin/fiftyPercentPage.js'
import onFarmCPHPage from '../../page-objects/origin/onFarmCPHPage.js'
import originCountryPage from '../../page-objects/origin/originCountryPage.js'
import contactTbRestrictedFarmExitPage from '../../page-objects/origin/contactTbRestrictedFarmExitPage.js'

describe('origin type page test (off farm)', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await originTypePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await originTypePage.originTypeErrorTest()
  })

  it('Should verify that off farm versions are loaded (by default)', async () => {
    await originTypePage.verifyOffFarmVersion()
  })

  it('Should navigate to cph page if moving off from tb restricted farm', async () => {
    await originTypePage.selectZooAndContinue(parishHoldingNumberPage)
  })

  it('Should navigate to on farm cph page if coming from afu', async () => {
    await originTypePage.selectZooAndContinue(parishHoldingNumberPage)
  })

  it('Should navigate to exit page if moving off from unrestricted premises', async () => {
    await originTypePage.selectUnrestrictedPremisesAndContinue(
      contactTbRestrictedFarmExitPage
    )
  })

  it('Should navigate to on farm cph page if moving off from zoo', async () => {
    await originTypePage.selectZooAndContinue(parishHoldingNumberPage)
  })

  it('Should navigate to on farm cph page if moving off from lab', async () => {
    await originTypePage.selectLabAndContinue(parishHoldingNumberPage)
  })

  it('Should navigate to on farm cph page if moving off from other origin', async () => {
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

describe('origin type page test (on farm)', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle()
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
  })

  it('Should verify that on farm options are loaded (if on farm was previously selected)', async () => {
    await originTypePage.verifyOnFarmVersion()
  })

  it('Should navigate to fifty percent page if coming from market', async () => {
    await originTypePage.selectMarketAndContinue(fiftyPercentPage)
  })

  it('Should navigate to fifty percent page if coming from unrestricted premises', async () => {
    await originTypePage.selectUnrestrictedPremisesAndContinue(fiftyPercentPage)
  })

  it('Should navigate to on farm cph page if coming from tb restricted farm', async () => {
    await originTypePage.selectZooAndContinue(onFarmCPHPage)
  })

  it('Should navigate to on farm cph page if coming from afu', async () => {
    await originTypePage.selectApprovedFinishingUnitAndContinue(onFarmCPHPage)
  })

  it('Should navigate to on farm cph page if coming from zoo', async () => {
    await originTypePage.selectZooAndContinue(onFarmCPHPage)
  })

  it('Should navigate to on farm cph page if coming from lab', async () => {
    await originTypePage.selectLabAndContinue(onFarmCPHPage)
  })

  it('Should navigate to on farm cph page if coming from other origin', async () => {
    await originTypePage.selectAnotherTypeOfPremisesAndContinue(onFarmCPHPage)
  })

  it('Should verify country page if coming from import', async () => {
    await originTypePage.selectAfterImportAndContinue(originCountryPage)
  })
})
