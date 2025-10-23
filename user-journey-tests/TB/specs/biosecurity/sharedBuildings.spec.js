import { verifySelectionPersistence } from '../../helpers/page.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import buildingsMinimiseContiaminationPage from '../../page-objects/biosecurity/buildingsMinimiseContiaminationPage.js'

describe('Shared buildings page test', () => {
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
    await anySharedBuildingsPage.selectYesAndContinue(
      buildingsMinimiseContiaminationPage
    )
    await verifySelectionPersistence(
      buildingsMinimiseContiaminationPage,
      anySharedBuildingsPage,
      anySharedBuildingsPage.yesRadio
    )
  })

  it('Should choose No and check its maintained', async () => {
    await anySharedBuildingsPage.selectNoAndContinue(peopleDisinfectionPage)
    await verifySelectionPersistence(
      peopleDisinfectionPage,
      anySharedBuildingsPage,
      anySharedBuildingsPage.noRadio
    )
  })
})
