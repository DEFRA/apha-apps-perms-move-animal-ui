import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'
import equipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import { verifySelectionPersistence } from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Shared Equipment Page Test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
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
