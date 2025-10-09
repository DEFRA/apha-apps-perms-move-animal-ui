import EquipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherEquipmentMeasuresPage from '../../page-objects/biosecurity/otherEquipmentMeasuresPage.js'

describe('Equipment contamination page spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await EquipmentContaminationPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await EquipmentContaminationPage.checkboxErrorTest()
  })

  it('Should input correct input and continue without error', async () => {
    await EquipmentContaminationPage.selectCheckboxesAndContinue(
      [EquipmentContaminationPage.disinfectingMilkingAndHandling],
      peopleDisinfectionPage
    )
  })

  it('Should verify other option takes to correct page', async () => {
    await EquipmentContaminationPage.selectCheckboxesAndContinue(
      [EquipmentContaminationPage.other],
      otherEquipmentMeasuresPage
    )
  })
})
