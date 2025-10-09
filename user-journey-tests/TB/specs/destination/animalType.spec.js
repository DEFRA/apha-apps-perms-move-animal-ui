import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import animalTypePage from '../../page-objects/destination/animalTypePage.js'
import restockingReasonPage from '../../page-objects/destination/restockingReasonPage.js'

describe('Animal type page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await animalTypePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await animalTypePage.checkboxErrorTest()
  })

  it('Should input correct input and continue without error', async () => {
    await animalTypePage.selectCheckboxesAndContinue(
      [animalTypePage.calves],
      restockingReasonPage
    )
  })
})
