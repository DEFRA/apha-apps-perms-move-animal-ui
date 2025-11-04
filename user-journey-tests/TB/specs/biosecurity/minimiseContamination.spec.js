import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import minimiseContaminationOtherPage from '../../page-objects/biosecurity/minimiseContaminationOtherPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Minimise contamination page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await minimiseContaminationPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is selected', async () => {
    await minimiseContaminationPage.checkboxErrorTest()
  })

  it('Should select options and continue to other page when other selected', async () => {
    await minimiseContaminationPage.selectCheckboxesAndContinue(
      [minimiseContaminationPage.cleaning, minimiseContaminationPage.other],
      minimiseContaminationOtherPage
    )
  })

  it('Should continue to people disinfection when other not selected', async () => {
    await minimiseContaminationPage.selectCheckboxesAndContinue(
      [minimiseContaminationPage.cleaning, minimiseContaminationPage.isolation],
      peopleDisinfectionPage
    )
  })
})
