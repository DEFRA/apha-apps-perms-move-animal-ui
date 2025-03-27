import { waitForPagePath } from '../../helpers/page.js'
import destinationAddressPage from '../../page-objects/destination/destinationAddressPage.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import signInPage from '../../page-objects/signInPage.js'

const lineOne = '37 Made up lane'
const lineTwo = 'Not real avenue'
const townOrCity = 'Gotham'
const county = 'West new york'
const postcodeValid = 'SW1A 2AA'

describe('On farm address page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await destinationAddressPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify successful submission when all fields entered', async () => {
    await destinationAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })

    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
