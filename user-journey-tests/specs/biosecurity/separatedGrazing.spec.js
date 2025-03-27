import { browser } from '@wdio/globals'

import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'

describe('Separated grazing page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await howFieldSeparatedPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await howFieldSeparatedPage.singleInputErrorTest(
      '',
      howFieldSeparatedPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await howFieldSeparatedPage.inputTextAndContinue(
      'By testing it',
      lastGrazedPage
    )
  })
})
