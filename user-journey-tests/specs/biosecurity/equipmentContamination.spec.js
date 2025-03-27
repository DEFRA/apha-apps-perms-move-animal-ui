import EquipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Equipment contamination page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await EquipmentContaminationPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await EquipmentContaminationPage.singleInputErrorTest(
      '',
      EquipmentContaminationPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await EquipmentContaminationPage.inputTextAndContinue(
      'Shared equipment',
      peopleDisinfectionPage
    )
  })
})
