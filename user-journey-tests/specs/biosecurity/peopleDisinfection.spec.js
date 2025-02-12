import { browser } from '@wdio/globals'

import disinfectionPage from '../../page-objects/biosecurity/disinfectionPage.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'

describe('People disinfection method page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await disinfectionPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await disinfectionPage.peopleDisinfectionErrorTest(
      '',
      disinfectionPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await disinfectionPage.inputPeopleDisinfectionAndContinue(
      'By testing it',
      disinfectantPage
    )
  })
})
