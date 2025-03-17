import { browser } from '@wdio/globals'
import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'
import equipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import { verifySelectionPersistence } from '../../helpers/page.js'

describe('Shared Equipment Page Test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await sharedEquipmentPage.navigateToPageAndVerifyTitle()
  })

  it('Should display an error when no option is selected', async () => {
    await sharedEquipmentPage.radioErrorTest()
  })

  it('Should retain "Yes" selection after navigation and refresh', async () => {
    await sharedEquipmentPage.selectYesAndContinue(equipmentContaminationPage)
    await verifySelectionPersistence(
      equipmentContaminationPage,
      sharedEquipmentPage,
      sharedEquipmentPage.yesRadio
    )
  })

  it('Should retain "No" selection after navigation and refresh', async () => {
    await sharedEquipmentPage.selectNoAndContinue(peopleDisinfectionPage)
    await verifySelectionPersistence(
      peopleDisinfectionPage,
      sharedEquipmentPage,
      sharedEquipmentPage.noRadio
    )
  })
})
