import { browser } from '@wdio/globals'
import disinfectantDilutionPage from '../../page-objects/biosecurity/disinfectantDilutionPage.js'
import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'

describe('Disinfectant dilution page spec', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await disinfectantDilutionPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the disinfectant link', async () => {
    await disinfectantDilutionPage.verifyDilutionGovLink()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await disinfectantDilutionPage.dilutionErrorTest(
      '',
      disinfectantDilutionPage.noInputError
    )
  })

  it('Should verify that page errors when something other than anumber is entered', async () => {
    await disinfectantDilutionPage.dilutionErrorTest(
      'test',
      disinfectantDilutionPage.invalidFormatError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await disinfectantDilutionPage.inputDilutionAndContinue(
      '1995',
      biosecBadgersPage
    )
  })
})
