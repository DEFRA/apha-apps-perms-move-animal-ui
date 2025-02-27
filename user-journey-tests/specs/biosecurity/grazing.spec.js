import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'

describe('Grazing selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await grazingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await grazingPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await grazingPage.selectYesAndContinue(lastGrazedPage)

    await lastGrazedPage.selectBackLink()
    await waitForPagePath(grazingPage.pagePath)

    await browser.refresh()
    await waitForPagePath(grazingPage.pagePath)

    await expect(grazingPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await grazingPage.selectNoAndContinue(anySharedBuildingsPage)

    await anySharedBuildingsPage.selectBackLink()
    await waitForPagePath(grazingPage.pagePath)

    await browser.refresh()
    await waitForPagePath(grazingPage.pagePath)

    await expect(grazingPage.noRadio).toBeSelected()
  })
})
