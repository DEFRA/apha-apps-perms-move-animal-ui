import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'

describe('Grazing selection test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await anySharedBuildingsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await anySharedBuildingsPage.sharedBuildingsErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await anySharedBuildingsPage.selectYesAndContinue()

    await expect(anySharedBuildingsPage.pageError).not.toBeDisplayed()
    await expect(anySharedBuildingsPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(minimiseContaminationPage.pagePath)

    await minimiseContaminationPage.selectBackLink()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await browser.refresh()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await expect(anySharedBuildingsPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await anySharedBuildingsPage.selectNoAndContinue()
    await waitForPagePath(disinfectionPage.pagePath)

    await disinfectionPage.selectBackLink()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await browser.refresh()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await expect(anySharedBuildingsPage.noRadio).toBeSelected()
  })
})
