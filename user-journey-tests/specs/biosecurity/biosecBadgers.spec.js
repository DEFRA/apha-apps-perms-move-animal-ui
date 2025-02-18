import { browser } from '@wdio/globals'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import { waitForPagePath } from '../../helpers/page.js'

describe('Biosecurity badgers page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await biosecBadgersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the tb licence link', async () => {
    await biosecBadgersPage.verifyTbLicenceLink()
  })

  it('Should select option(s) and continue without error', async () => {
    await biosecBadgersPage.selectOptionsAndContinue(
      [
        biosecBadgersPage.aluminiumFeedBins,
        biosecBadgersPage.badgerProofFencing
      ],
      keptSeparatelyPage
    )
    await keptSeparatelyPage.selectBackLink()
    await waitForPagePath(biosecBadgersPage.pagePath)
    await expect(biosecBadgersPage.aluminiumFeedBins).toBeChecked()
    await expect(biosecBadgersPage.badgerProofFencing).toBeChecked()
  })
})
