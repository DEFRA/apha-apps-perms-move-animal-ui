import { browser, expect } from '@wdio/globals'
import { waitForPagePath } from '../../helpers/page.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import fiftyPercentPage from '../../page-objects/origin/fiftyPercentPage.js'
import onFarmCPHPage from '../../page-objects/origin/onFarmCPHPage.js'
import originCountryPage from '../../page-objects/origin/originCountryPage.js'

describe('To from farm page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await toFromFarmPage.toFromFarmErrorTest()
  })

  it('Should select on the farm radio and continue', async () => {
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.verifyOnFarmVersion()
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    await originTypePage.verifyPageHeadingAndTitle()
    await originTypePage.verifyOffFarmVersion()
    await browser.back()

    await browser.refresh()
    await waitForPagePath(toFromFarmPage.pagePath)

    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })

  it('Should verify fifty percent page navigation', async () => {
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.selectMarketAndContinue(fiftyPercentPage)
  })

  it('Should verify on farm cph page', async () => {
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.selectZooAndContinue(onFarmCPHPage)
  })

  it('Should verify country page', async () => {
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
    await originTypePage.selectAfterImportAndContinue(originCountryPage)
  })
})
