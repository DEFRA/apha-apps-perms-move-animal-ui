import { browser } from '@wdio/globals'

import { waitForPagePath } from '../../helpers/page.js'
import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'

describe('Minimise contamination page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await minimiseContaminationPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await minimiseContaminationPage.minimiseContaminationErrorTest(
      '',
      minimiseContaminationPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await minimiseContaminationPage.inputMinimiseContaminationAndContinue(
      'By testing it'
    )
    await expect(
      minimiseContaminationPage.minimiseContaminationFieldError()
    ).not.toBeDisplayed()
    await expect(minimiseContaminationPage.errorSummary).not.toBeDisplayed()
    await waitForPagePath(disinfectionPage.pagePath)
  })
})
