import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import roadsAndTracksPage from '../../page-objects/biosecurity/roadsAndTracksPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'

describe('Roads and tracks test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await roadsAndTracksPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await roadsAndTracksPage.roadsAndTracksErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await roadsAndTracksPage.selectYesAndContinue()

    await expect(roadsAndTracksPage.pageError).not.toBeDisplayed()
    await expect(roadsAndTracksPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await anySharedBuildingsPage.selectBackLink()
    await waitForPagePath(roadsAndTracksPage.pagePath)

    await browser.refresh()
    await waitForPagePath(roadsAndTracksPage.pagePath)

    await expect(roadsAndTracksPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await roadsAndTracksPage.selectNoAndContinue()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await anySharedBuildingsPage.selectBackLink()
    await waitForPagePath(roadsAndTracksPage.pagePath)

    await browser.refresh()
    await waitForPagePath(roadsAndTracksPage.pagePath)

    await expect(roadsAndTracksPage.noRadio).toBeSelected()
  })
})
