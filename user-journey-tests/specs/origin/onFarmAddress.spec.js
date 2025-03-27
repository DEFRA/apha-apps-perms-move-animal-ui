import onFarmAddressPage from '../../page-objects/origin/onFarmAddressPage.js'
import { waitForPagePath } from '../../helpers/page.js'
import fiftyPercentWarningPage from '../../page-objects/origin/fiftyPercentWarningPage.js'
import signInPage from '../../page-objects/signInPage.js'

const lineOne = '37 Made up lane'
const lineTwo = 'Not real avenue'
const townOrCity = 'Gotham'
const county = 'West new york'
const postcodeValid = 'SW1A 2AA'

describe('On farm address page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await onFarmAddressPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify successful submission when all fields entered', async () => {
    await onFarmAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })

    await waitForPagePath(fiftyPercentWarningPage.pagePath)
  })
})
