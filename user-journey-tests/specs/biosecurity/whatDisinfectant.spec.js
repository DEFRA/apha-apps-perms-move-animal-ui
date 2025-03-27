import { browser } from '@wdio/globals'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'
import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'

describe('Disinfectant page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await disinfectantPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the disinfectant link', async () => {
    await disinfectantPage.verifyDisinfectantGovLink()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await disinfectantPage.singleInputErrorTest(
      '',
      disinfectantPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await disinfectantPage.inputTextAndContinue(
      'Batman disinfectant',
      disinfectantDilutionPage
    )
  })
})
