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
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

export const validateOnOffFarm = async (changeLink, valueElement, nextPage) => {
  await selectElement(changeLink)

  await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
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

  if (currentSelection === 'off') {
    await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
    await toFromFarmPage.selectOnFarmAndContinue(nextPage)

    await validateElementVisibleAndText(
      valueElement,
      'On to the farm or premises'
    )
  } else {
    await expect(toFromFarmPage.onThefarmRadio).toBeSelected()
    await toFromFarmPage.selectOffFarmAndContinue(nextPage)

    await validateElementVisibleAndText(
      valueElement,
      'Off the farm or premises'
    )
  }
}

export const validateOriginType = async (
  changeLink,
  valueElement,
  nextPage
) => {
  await selectElement(changeLink)

  await expect(originTypePage.tbRestrictedFarmRadio).toBeSelected()
  await originTypePage.selectApprovedFinishingUnitAndContinue(nextPage)

  await validateElementVisibleAndText(
    valueElement,
    'Approved finishing unit (AFU)'
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

  const firstNameValue = await ownerNamePage.firstNameInput().getValue()
  expect(firstNameValue).toBe(defaultFirstName)
  const lastNameValue = await ownerNamePage.lastNameInput().getValue()
  expect(lastNameValue).toBe(defaultLastName)

  await clearElement(ownerNamePage.firstNameInput())
  await clearElement(ownerNamePage.lastNameInput())

  await ownerNamePage.inputNameAndContinue(newFirstName, newLastName)
  await validateElementVisibleAndText(
    valueElement,
    `${newFirstName} ${newLastName}`
  )
}

export const validateReceiveMethod = async (changeLink, valueElement) => {
  await selectElement(changeLink)

  await expect(receiveMethodPage.emailRadio).toBeSelected()
  await receiveMethodPage.selectEmailAndContinue()

  await validateElementVisibleAndText(valueElement, 'Email')
}
