import { browser } from '@wdio/globals'

import minimiseContaminationPage from '../../page-objects/biosecurity/minimiseContaminationPage.js'
import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'

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
      'By testing it',
      peopleDisinfectionPage
    )
  })
})
