import newAddressPage from '../../page-objects/origin/newAddressPage'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage'
import emailPage from '../../page-objects/receiving-the-licence/emailPage'
import {
  clearElement,
  selectElement,
  validateElementVisibleAndText
} from '../page'

export const validateOnOffFarm = async (changeLink, valueElement) => {
  await selectElement(changeLink)

  await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  await toFromFarmPage.selectOffFarmAndContinue()

  await validateElementVisibleAndText(valueElement, 'Off the farm or premises')
}

export const validateAndAdjustParishNumber = async (
  changeLink,
  valueElement,
  defaultNumber,
  inputNumber
) => {
  await selectElement(changeLink)

  const inputValue = await parishHoldingNumberPage.cphNumberInput().getValue()
  expect(inputValue).toBe(defaultNumber)
  await clearElement(parishHoldingNumberPage.cphNumberInput())
  await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(inputNumber)

  await validateElementVisibleAndText(valueElement, inputNumber)
}

export const validateAndAdjustAddress = async (
  changeLink,
  valueElement,
  {
    lineOne: defaultLineOne,
    townOrCity: defaultTownOrCity,
    postcode: defaultPostcode
  },
  { lineOne, lineTwo, townOrCity, county, postcode }
) => {
  await selectElement(changeLink)

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

  await validateElementVisibleAndText(valueElement, lineOne)
  await validateElementVisibleAndText(valueElement, lineTwo)
  await validateElementVisibleAndText(valueElement, townOrCity)
  await validateElementVisibleAndText(valueElement, county)
  await validateElementVisibleAndText(valueElement, postcode)
}

export const validateAndAdjustEmail = async (
  changeLink,
  valueElement,
  defaultEmail,
  inputEmail
) => {
  await selectElement(changeLink)

  const inputValue = await emailPage.emailAddressInput().getValue()
  expect(inputValue).toBe(defaultEmail)
  await clearElement(emailPage.emailAddressInput())
  await emailPage.inputEmailAndContinue(inputEmail)

  await validateElementVisibleAndText(valueElement, inputEmail)
}
