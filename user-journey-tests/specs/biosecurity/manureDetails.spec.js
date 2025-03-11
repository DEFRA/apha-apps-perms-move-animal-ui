import { browser } from '@wdio/globals'

import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'

describe('Last grazed page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await manureDetailsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await manureDetailsPage.singleInputErrorTest(
      '',
      manureDetailsPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await manureDetailsPage.inputTextAndContinue(
      '2 years',
      anySharedBuildingsPage
    )
  })
})
