import { browser } from '@wdio/globals'

import peopleDisinfectionPage from '../../page-objects/biosecurity/peopleDisinfectionPage.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'

describe('People disinfection method page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await peopleDisinfectionPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await peopleDisinfectionPage.singleInputErrorTest(
      '',
      peopleDisinfectionPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await peopleDisinfectionPage.inputTextAndContinue(
      'By testing it',
      disinfectantPage
    )
  })
})
