import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherStaffMeasuresPage from '../../page-objects/biosecurity/otherStaffMeasuresPage.js'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'

describe('Last grazed page spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await otherStaffMeasuresPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await otherStaffMeasuresPage.singleInputErrorTest(
      '',
      otherStaffMeasuresPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await otherStaffMeasuresPage.inputTextAndContinue(
      '2 years',
      biosecBadgersPage
    )
  })
})
