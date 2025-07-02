import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import otherWildlifeMeasuresPage from '../../page-objects/biosecurity/otherWildlifeMeasuresPage.js'
import biosecIntroPage from '../../page-objects/biosecurity/biosecIntroPage.js'

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
    await biosecBadgersPage.selectCheckboxesAndContinue([], biosecIntroPage)
  })

  it('Should input selection on multiple checkboxes and verify sumbit', async () => {
    await biosecBadgersPage.selectCheckboxesAndContinue(
      [
        biosecBadgersPage.aluminiumFeedBins,
        biosecBadgersPage.badgerProofFencing
      ],
      biosecIntroPage
    )
  })

  it('Should input other measures and verify other measures page is reached', async () => {
    await biosecBadgersPage.selectCheckboxesAndContinue(
      [biosecBadgersPage.other],
      otherWildlifeMeasuresPage
    )
  })
})
