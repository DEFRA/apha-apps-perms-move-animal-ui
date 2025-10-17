import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherEquipmentMeasuresPage from '../../page-objects/biosecurity/otherEquipmentMeasuresPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'

describe('Other equipment measures page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await otherEquipmentMeasuresPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await otherEquipmentMeasuresPage.singleInputErrorTest(
      '',
      otherEquipmentMeasuresPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await otherEquipmentMeasuresPage.inputTextAndContinue(
      '1995',
      anySharedBuildingsPage
    )
  })
})
