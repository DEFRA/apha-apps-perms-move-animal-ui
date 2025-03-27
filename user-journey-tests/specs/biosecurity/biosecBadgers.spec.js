import { browser } from '@wdio/globals'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

describe('Biosecurity badgers page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await biosecBadgersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await biosecBadgersPage.singleInputErrorTest(
      '',
      biosecBadgersPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await biosecBadgersPage.inputTextAndContinue(
      'Badger measures',
      keptSeparatelyPage
    )
  })
})
