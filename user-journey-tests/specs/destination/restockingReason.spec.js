import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import restockingReasonPage from '../../page-objects/destination/restockingReasonPage.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import otherRestockingReasonPage from '../../page-objects/destination/otherRestockingReasonPage.js'

describe('Restocking reason page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await restockingReasonPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await restockingReasonPage.checkboxErrorTest()
  })

  it('Should input correct input and continue without error', async () => {
    await restockingReasonPage.selectCheckboxesAndContinue(
      [restockingReasonPage.breeding],
      additionalInfoPage
    )
  })

  it('Should verify other option takes to correct page', async () => {
    await restockingReasonPage.selectCheckboxesAndContinue(
      [restockingReasonPage.other],
      otherRestockingReasonPage
    )
  })
})
