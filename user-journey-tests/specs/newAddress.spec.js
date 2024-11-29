import { browser } from '@wdio/globals'

import { loadPageAndVerifyTitle } from '../helpers/page.js'
import newAddressPage from '../page-objects/origin/newAddressPage.js'

const longString = 'a'.repeat(300)
const longPostcode = 'SW1A2AATEST'

const lineOne = '37 Made up lane'
const lineTwo = 'Not real avenue'
const townOrCity = 'Gotham'
const county = 'West new york'
const postcodeValid = 'SW1A 2AA'
const postcodeInvalid = 'test'

describe('New address page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle(
      newAddressPage.urlPath,
      newAddressPage.pageTitle
    )
  })

  it('Should verify all errors when no input', async () => {
    await newAddressPage.verifyPageHeading()
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

  it('Should verify successful submission and no errors when optional fields ignored', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      townOrCity,
      postcode: postcodeValid
    })
    await newAddressPage.verifyNoErrorsVisible()
  })

  it('Should verify successful submission when all fields entered', async () => {
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })

    await newAddressPage.verifyNoErrorsVisible()
    await newAddressPage.selectBackLink()

    await newAddressPage.verifyFieldValues({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode: postcodeValid
    })
  })
})
