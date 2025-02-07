import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import roadsAndTracksPage from '../../page-objects/biosecurity/roadsAndTracksPage.js'

describe('Kept separately selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await grazingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await grazingPage.grazingErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await grazingPage.selectYesAndContinue()

    await expect(grazingPage.pageError).not.toBeDisplayed()
    await expect(grazingPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(lastGrazedPage.pagePath)

    await lastGrazedPage.selectBackLink()
    await waitForPagePath(grazingPage.pagePath)

    await browser.refresh()
    await waitForPagePath(grazingPage.pagePath)

    await expect(grazingPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await grazingPage.selectNoAndContinue()
    await waitForPagePath(roadsAndTracksPage.pagePath)

    await disinfectionPage.selectBackLink()
    await waitForPagePath(grazingPage.pagePath)

    await browser.refresh()
    await waitForPagePath(grazingPage.pagePath)

    await expect(grazingPage.noRadio).toBeSelected()
  })
})
