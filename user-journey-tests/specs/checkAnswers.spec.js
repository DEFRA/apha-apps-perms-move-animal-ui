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
import completeOriginTaskAnswers from '../helpers/testHelpers/movementLicense.js'
import landingPage from '../page-objects/landingPage.js'

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
    await completeOriginTaskAnswers()
  })

  it('Should verify the back link', async () => {
    await checkAnswersPage.selectBackLink()
    await newAddressPage.addressLineOneInput().isDisplayed()
  })

  it('Should verify changing the on off farm answer', async () => {
    await checkAnswersPage.verifyPageHeading(checkAnswersPage.checkAnswersTitle)
    await selectElement(checkAnswersPage.changeOnOrOffLink)
    await toFromFarmPage.selectOffFarmAndContinue()
    await validateElementVisibleAndText(
      checkAnswersPage.onOffFarmValue,
      'Off the farm or premises'
    )
  })

  it('Should verify changing the cph number', async () => {
    await selectElement(checkAnswersPage.changeParishNumberLink)
    await clearElement(parishHoldingNumberPage.cphNumberInput())
    await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      parishHoldingInput
    )
    await validateElementVisibleAndText(
      checkAnswersPage.parishNumberValue,
      parishHoldingInput
    )
  })

  it('Should verify changing the address', async () => {
    await selectElement(checkAnswersPage.changeAddressLink)
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
