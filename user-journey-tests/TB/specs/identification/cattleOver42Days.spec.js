import { verifySelectionPersistence } from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'
import cattleOver42DaysPage from '../../page-objects/identification/cattleOver42DaysPage.js'
import calvesPage from '../../page-objects/identification/calvesPage.js'

describe('Cattle over 42 days old page spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await cattleOver42DaysPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when no option is selected', async () => {
    await cattleOver42DaysPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await cattleOver42DaysPage.selectYesAndContinue(testingDatesPage)
    await verifySelectionPersistence(
      testingDatesPage,
      cattleOver42DaysPage,
      cattleOver42DaysPage.yesRadio
    )
  })

  it('Should choose No and check its maintained', async () => {
    await cattleOver42DaysPage.selectNoAndContinue(calvesPage)
    await verifySelectionPersistence(
      calvesPage,
      cattleOver42DaysPage,
      cattleOver42DaysPage.noRadio
    )
  })
})
