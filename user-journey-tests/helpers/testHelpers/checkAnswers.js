import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import exitPage from '../../page-objects/origin/exitPage.js'
import {
  clearElement,
  selectElement,
  validateElementVisibleAndText
} from '../page.js'
import taskListIncompletePage from '../../page-objects/taskListIncompletePage.js'

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

  // Expected text must be kept to the left of the page to ensure accuracy in the check
  const elementText = await checkAnswersPage.addressValue
    .getHTML(false)
    .then((text) => text.replace(/<br\s*\/?>/g, '\n').trim())
  const expectedText = `${lineOne}
${lineTwo}
${townOrCity}
${county}
${postcode}`
  expect(elementText).toBe(expectedText)
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

export const validateOnFarmErrorHandling = async (
  changeElement,
  checkAnswersHeading,
  final = true
) => {
  await selectElement(changeElement)
  await toFromFarmPage.selectOnFarmAndContinue()
  await exitPage.verifyPageHeadingAndTitle(exitPage.pageHeading)
  await exitPage.selectBackLink()
  await expect(toFromFarmPage.onThefarmRadio).toBeSelected()
  await toFromFarmPage.selectBackLink()
  await checkAnswersPage.verifyPageHeadingAndTitle(checkAnswersHeading)
  await browser.refresh()
  if (final) {
    await expect(toFromFarmPage.onThefarmRadio).toBeExisting()
  } else {
    await taskListIncompletePage.verifyPageHeadingAndTitle(
      taskListIncompletePage.pageHeading
    )
  }
}
