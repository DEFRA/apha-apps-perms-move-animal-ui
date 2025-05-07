import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Biosecurity badgers page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await biosecBadgersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that all checkboxes exist and submit with no options selected', async () => {
    await biosecBadgersPage.verifyAllCheckboxesExist()
    await biosecBadgersPage.selectMeasuresAndContinue([], keptSeparatelyPage)
  })

  it('Should input selection on multiple checkboxes and verify sumbit', async () => {
    await biosecBadgersPage.selectMeasuresAndContinue(
      [
        biosecBadgersPage.aluminiumFeedBins,
        biosecBadgersPage.badgerProofFencing
      ],
      keptSeparatelyPage
    )
  })
})
