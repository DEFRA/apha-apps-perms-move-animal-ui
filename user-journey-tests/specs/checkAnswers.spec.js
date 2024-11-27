import { browser } from '@wdio/globals'

import {
  clearElement,
  loadPageAndVerifyTitle,
  selectElement,
  validateElementVisibleAndText
} from '../helpers/page.js'
import checkAnswersPage from '../page-objects/checkAnswersPage.js'
import newAddressPage from '../page-objects/newAddressPage.js'
import parishHoldingNumberPage from '../page-objects/parishHoldingNumberPage.js'
import toFromFarmPage from '../page-objects/toFromFarmPage.js'
import completeOriginTaskAnswers, {
  completeOriginTaskAnswersCustom
} from '../helpers/testHelpers/movementLicense.js'
import landingPage from '../page-objects/landingPage.js'

const defaultCphNumber = '23/678/1234'
const defaultLineOne = 'default line one'
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

const parishHoldingInput = '45/456/4567'
const lineOne = 'edited line one'
const lineTwo = 'edited line two'
const townOrCity = 'Gotham edited'
const county = 'West new york edited'
const postcode = 'SW1C 2CC'

describe('Check your answers test', () => {
  beforeEach('Navigate to check answers page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.landingPageTitleText)
  })

  it('Should verify the back link is history -1', async () => {
    await completeOriginTaskAnswers()
    await checkAnswersPage.selectBackLink()

    await newAddressPage.addressLineOneInput().isDisplayed()
  })

  it('Should verify the existing radio selection and verify resubmission', async () => {
    await completeOriginTaskAnswers()
    await checkAnswersPage.verifyPageHeading(checkAnswersPage.checkAnswersTitle)
    await selectElement(checkAnswersPage.changeOnOrOffLink)

    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
    await toFromFarmPage.selectOffFarmAndContinue()

    await validateElementVisibleAndText(
      checkAnswersPage.onOffFarmValue,
      'Off the farm or premises'
    )
  })

  it('Should verify the existing cph number then verify changing the cph number', async () => {
    completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
    await selectElement(checkAnswersPage.changeParishNumberLink)

    await expect(parishHoldingNumberPage.cphNumberInput()).toHaveValue(
      defaultCphNumber
    )
    await clearElement(parishHoldingNumberPage.cphNumberInput())
    await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      parishHoldingInput
    )

    await validateElementVisibleAndText(
      checkAnswersPage.parishNumberValue,
      parishHoldingInput
    )
  })

  it('Should verify the existing data then verify changing the address', async () => {
    completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
    await selectElement(checkAnswersPage.changeAddressLink)

    await newAddressPage.verifyFieldValues({
      lineOne: defaultLineOne,
      townOrCity: defaultTownOrCity,
      postcode: defaultPostcode
    })
    await newAddressPage.clearFormFields()
    await newAddressPage.fillFormFieldsAndSubmit({
      lineOne,
      lineTwo,
      townOrCity,
      county,
      postcode
    })

    await validateElementVisibleAndText(checkAnswersPage.addressValue, lineOne)
    await validateElementVisibleAndText(checkAnswersPage.addressValue, lineTwo)
    await validateElementVisibleAndText(
      checkAnswersPage.addressValue,
      townOrCity
    )
    await validateElementVisibleAndText(checkAnswersPage.addressValue, county)
    await validateElementVisibleAndText(checkAnswersPage.addressValue, postcode)
  })
})
