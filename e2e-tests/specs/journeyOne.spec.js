import landingPage from '~/ttest/page-objects/landingPage'
import toFromFarmPage from '~/test/page-objects/toFromFarmPage'
import { loadPageAndVerifyTitle } from '~/test/helpers/page'
import parishHoldingNumberPage from '../page-objects/parishHoldingNumberPage'
import newAddressPage from '../page-objects/newAddressPage'

const lineOne = '37 Made up lane'
const townOrCity = 'Gotham'
const postcode = 'SW1A2AA'

describe('Full journey test 1', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.landingPageTitleText)
  })

  it('Should navigate you through the first journey happy path', async () => {
    await landingPage.verifyStartNowButton('Start now', true)
    await toFromFarmPage.selectOffFarmAndContinue()
    await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      '12/345/6789'
    )
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity,
      postcode
    })
  })
})
