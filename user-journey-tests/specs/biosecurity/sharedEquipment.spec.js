import { browser, expect } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'
import equipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'

describe('Shared buildings page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await sharedEquipmentPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await sharedEquipmentPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await sharedEquipmentPage.selectYesAndContinue(equipmentContaminationPage)

    await equipmentContaminationPage.selectBackLink()
    await waitForPagePath(sharedEquipmentPage.pagePath)

    await browser.refresh()
    await waitForPagePath(sharedEquipmentPage.pagePath)

    await expect(sharedEquipmentPage.yesRadio).toBeSelected()
  })

  it('Should choose No and check its maintained', async () => {
    await sharedEquipmentPage.selectNoAndContinue(peopleDisinfectionPage)

    await peopleDisinfectionPage.selectBackLink()
    await waitForPagePath(sharedEquipmentPage.pagePath)

    await browser.refresh()
    await waitForPagePath(sharedEquipmentPage.pagePath)

    await expect(sharedEquipmentPage.noRadio).toBeSelected()
  })
})
