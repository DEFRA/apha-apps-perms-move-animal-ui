import newAddressPage from '../../../page-objects/origin/newAddressPage.js'
import signInPage from '../../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../../helpers/authSessionManager.js'

const longString = 'a'.repeat(300)
const longPostcode = 'SW1A2AATEST'

const lineOne = '37 Made up lane'
const townOrCity = 'Gotham'
const postcodeValid = 'SW1A 2AA'
const postcodeInvalid = 'test'

describe('New address page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await newAddressPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify all errors when no input', async () => {
    await newAddressPage.verifyPageHeadingAndTitle()
    await newAddressPage.selectContinue()
    await newAddressPage.verifyNewAddressErrors([
      'lineOne',
      'townOrCity',
      'noPostcode'
    ])
  })

  it('Should verify just line one error', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      townOrCity,
      postcode: postcodeValid
    })
    await newAddressPage.verifyNewAddressErrors(['lineOne'])
  })

  it('Should verify error when no input in town or city', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      postcode: postcodeValid
    })
    await newAddressPage.verifyNewAddressErrors(['townOrCity'])
  })

  it('Should verify error when no input in postcode', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity
    })
    await newAddressPage.verifyNewAddressErrors(['noPostcode'])
  })

  it('Should verify error when postcode is invalid format', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity,
      postcode: postcodeInvalid
    })
    await newAddressPage.verifyNewAddressErrors(['invalidPostcode'])
  })

  it('Should verify errors when max length exceeded', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne: longString,
      lineTwo: longString,
      townOrCity: longString,
      county: longString,
      postcode: longPostcode
    })

    await newAddressPage.verifyNewAddressErrors([
      'lineOneMaxLength',
      'lineTwoMaxLength',
      'townOrCityMaxLength',
      'countyMaxLength',
      'invalidPostcode'
    ])
  })
})
