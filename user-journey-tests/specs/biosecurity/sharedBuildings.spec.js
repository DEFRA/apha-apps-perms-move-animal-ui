import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'

describe('Shared buildings page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await anySharedBuildingsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await anySharedBuildingsPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await anySharedBuildingsPage.selectYesAndContinue(minimiseContaminationPage)

    await minimiseContaminationPage.selectBackLink()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await browser.refresh()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await expect(anySharedBuildingsPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await anySharedBuildingsPage.selectNoAndContinue(sharedEquipmentPage)

    await sharedEquipmentPage.selectBackLink()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await browser.refresh()
    await waitForPagePath(anySharedBuildingsPage.pagePath)

    await expect(anySharedBuildingsPage.noRadio).toBeSelected()
  })
})
