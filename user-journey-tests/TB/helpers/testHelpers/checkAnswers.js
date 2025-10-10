import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import parishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import {
  clearElement,
  selectElement,
  validateElementVisibleAndText
} from '../page.js'
import finalAnswersPage from '../../page-objects/finalAnswersPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

export const validateOnOffFarm = async (changeLink, valueElement, nextPage) => {
  await selectElement(changeLink)

  await expect(toFromFarmPage.offRadio).toBeSelected()
  await toFromFarmPage.selectOffFarmAndContinue(nextPage)

  await validateElementVisibleAndText(valueElement, 'Off the farm or premises')
}

export const changeOnOffFarmAnswer = async (
  changeLink,
  currentSelection,
  valueElement,
  nextPage
) => {
  await selectElement(changeLink)

  if (currentSelection === 'on') {
    await expect(toFromFarmPage.offRadio).toBeSelected()
    await toFromFarmPage.selectOnFarmAndContinue(nextPage)

    await validateElementVisibleAndText(
      valueElement,
      'On to the farm or premises'
    )
  } else {
    await expect(toFromFarmPage.onRadio).toBeSelected()
    await toFromFarmPage.selectOffFarmAndContinue(nextPage)

    await validateElementVisibleAndText(
      valueElement,
      'Off the farm or premises'
    )
  }
}

export const changeOption = async (
  changeLink,
  changeAndContinueAction,
  nextPage
) => {
  await selectElement(changeLink)
  await changeAndContinueAction(nextPage)
}

export const validateOriginType = async (
  changeLink,
  valueElement,
  nextPage
) => {
  await selectElement(changeLink)

  await expect(originTypePage['tb-restricted-farmRadio']).toBeSelected()
  await originTypePage.selectTbRestrictedFarm(nextPage)

  await validateElementVisibleAndText(
    valueElement,
    'TB restricted farm'
  )
}

export const validateAndAdjustParishNumber = async (
  changeLink,
  valueElement,
  defaultNumber,
  inputNumber,
  nextPage
) => {
  await selectElement(changeLink)

  const inputValue = await parishHoldingNumberPage.cphNumberInput().getValue()
  expect(inputValue).toBe(defaultNumber)
  await clearElement(parishHoldingNumberPage.cphNumberInput())
  await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
    inputNumber,
    nextPage
  )

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
  const elementText = await checkAnswersPage
    .getValue('address')
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

  const inputValue = await emailPage.textInput().getValue()
  expect(inputValue).toBe(defaultEmail)
  await clearElement(emailPage.textInput())
  await emailPage.inputTextAndContinue(inputEmail)

  await validateElementVisibleAndText(valueElement, inputEmail)
}

export const validateAndAdjustSeparateCattle = async (
  changeLink,
  valueElement
) => {
  await validateElementVisibleAndText(valueElement, 'Yes')
  await selectElement(changeLink)

  await expect(keptSeparatelyPage.yesRadio).toBeSelected()
  await keptSeparatelyPage.selectNoAndContinue(finalAnswersPage)

  await validateElementVisibleAndText(valueElement, 'No')
}

export const validateAndAdjustOwnerName = async (
  changeLink,
  valueElement,
  defaultFirstName,
  newFirstName,
  defaultLastName,
  newLastName
) => {
  await selectElement(changeLink)

  const firstNameValue = await ownerNamePage.firstTextInput().getValue()
  expect(firstNameValue).toBe(defaultFirstName)
  const lastNameValue = await ownerNamePage.lastTextInput().getValue()
  expect(lastNameValue).toBe(defaultLastName)

  await clearElement(ownerNamePage.firstTextInput())
  await clearElement(ownerNamePage.lastTextInput())

  await ownerNamePage.inputTextAndContinue(newFirstName, newLastName)
  await validateElementVisibleAndText(
    valueElement,
    `${newFirstName} ${newLastName}`
  )
}
