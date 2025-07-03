import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherStaffMeasuresPage from '../../page-objects/biosecurity/otherStaffMeasuresPage.js'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'

describe('Equipment contamination page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await peopleDisinfectionPage.navigateToPageAndVerifyTitle()
  })

  it('Should input correct input and continue without error', async () => {
    await peopleDisinfectionPage.selectCheckboxesAndContinue(
      [peopleDisinfectionPage.ppe],
      biosecBadgersPage
    )
  })

  it('Should verify other option takes to correct page', async () => {
    await peopleDisinfectionPage.selectCheckboxesAndContinue(
      [peopleDisinfectionPage.other],
      otherStaffMeasuresPage
    )
  })
})
