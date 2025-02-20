import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import importAddressPage from '../../page-objects/origin/importAddressPage.js'
import { waitForPagePath } from '../../helpers/page.js'
import fiftyPercentWarningPage from '../../page-objects/origin/fiftyPercentWarningPage.js'

const lineOne = '37 Made up lane'
const lineTwo = 'Not real avenue'
const townOrCity = 'Gotham'
const county = 'West new york'
const postcodeValid = 'SW1A 2AA'

describe('import address page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await importAddressPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify successful submission when all fields entered', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })

    await waitForPagePath(fiftyPercentWarningPage.pagePath)
  })
})
