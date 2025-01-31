import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'

describe('Kept separately selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await keptSeparatelyPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await keptSeparatelyPage.keptSeparatelySelectionErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await keptSeparatelyPage.selectYesAndContinue()

    await expect(keptSeparatelyPage.pageError).not.toBeDisplayed()
    await expect(keptSeparatelyPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(grazingPage.pagePath)

    await grazingPage.selectBackLink()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await browser.refresh()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await expect(keptSeparatelyPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await keptSeparatelyPage.selectNoAndContinue()
    await waitForPagePath(disinfectionPage.pagePath)

    await disinfectionPage.selectBackLink()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await browser.refresh()
    await waitForPagePath(keptSeparatelyPage.pagePath)

    await expect(keptSeparatelyPage.noRadio).toBeSelected()
  })
})
