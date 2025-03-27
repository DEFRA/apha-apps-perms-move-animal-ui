import { browser } from '@wdio/globals'

import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
import manureAndSlurryPage from '../../page-objects/biosecurity/manureAndSlurryPage.js'

describe('Last grazed page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await lastGrazedPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await lastGrazedPage.singleInputErrorTest('', lastGrazedPage.noInputError)
  })

  it('Should input correct input and continue without error', async () => {
    await lastGrazedPage.inputTextAndContinue('2 years', manureAndSlurryPage)
  })
})
