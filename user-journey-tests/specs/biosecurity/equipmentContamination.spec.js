import { browser } from '@wdio/globals'

import EquipmentContaminationPage from '../../page-objects/biosecurity/equipmentContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'

describe('People disinfection method page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
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