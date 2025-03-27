import { verifySelectionPersistence } from '../../helpers/page.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import sharedEquipmentPage from '../../page-objects/biosecurity/sharedEquipmentPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Shared buildings page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await anySharedBuildingsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await anySharedBuildingsPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await anySharedBuildingsPage.selectYesAndContinue(minimiseContaminationPage)
    await verifySelectionPersistence(
      sharedEquipmentPage,
      anySharedBuildingsPage,
      anySharedBuildingsPage.yesRadio
    )
  })

  it('Should choose No and check its maintained', async () => {
    await anySharedBuildingsPage.selectNoAndContinue(sharedEquipmentPage)
    await verifySelectionPersistence(
      sharedEquipmentPage,
      anySharedBuildingsPage,
      anySharedBuildingsPage.noRadio
    )
  })
})
