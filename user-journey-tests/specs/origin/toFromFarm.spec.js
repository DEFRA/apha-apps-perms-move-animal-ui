import { browser, expect } from '@wdio/globals'
import { waitForPagePath } from '../../helpers/page.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
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
    await toFromFarmPage.selectOnFarmAndContinue(originTypePage)
  })

  it('Should choose an option and check its maintained', async () => {
    await toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    await originTypePage.verifyPageHeadingAndTitle()
    await browser.back()

    await browser.refresh()
    await waitForPagePath(toFromFarmPage.pagePath)

    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  })
})
