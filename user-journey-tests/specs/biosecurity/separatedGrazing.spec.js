import { browser } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import roadsAndTracksPage from '../../page-objects/biosecurity/roadsAndTracksPage.js'

describe('Separated grazing page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await howFieldSeparatedPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await howFieldSeparatedPage.fieldSeparatedErrorTest(
      '',
      howFieldSeparatedPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await howFieldSeparatedPage.inputSeparatedGrazingAndContinue(
      'By testing it'
    )
    await expect(
      howFieldSeparatedPage.separatedGrazingFieldError()
    ).not.toBeDisplayed()
    await expect(howFieldSeparatedPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(roadsAndTracksPage.pagePath)
  })
})
