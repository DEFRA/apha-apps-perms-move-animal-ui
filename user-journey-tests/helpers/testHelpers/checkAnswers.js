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
import finalAnswersPage from '../../page-objects/finalAnswersPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'

export const validateOnOffFarm = async (changeLink, valueElement) => {
  await selectElement(changeLink)

  await expect(toFromFarmPage.offThefarmRadio).toBeSelected()
  await toFromFarmPage.selectOffFarmAndContinue()

  await validateElementVisibleAndText(valueElement, 'Off the farm or premises')
}

export const validateOriginType = async (changeLink, valueElement) => {
  await selectElement(changeLink)

  await expect(originTypePage.tbRestrictedFarmRadio).toBeSelected()
  await originTypePage.selectApprovedFinishingUnitAndContinue()

  await validateElementVisibleAndText(
    valueElement,
    'Approved finishing unit (AFU)'
  )
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

export const validateAndAdjustSeparateCattle = async (
  changeLink,
  valueElement
) => {
  await validateElementVisibleAndText(valueElement, 'Yes')
  await selectElement(changeLink)

  await expect(keptSeparatelyPage.yesRadio).toBeSelected()
  await keptSeparatelyPage.selectNoAndContinue()

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

export const validateOnFarmErrorHandling = async (
  changeElement,
  final = false
) => {
  await selectElement(changeElement)
  await toFromFarmPage.verifyPageHeadingAndTitle()
  await toFromFarmPage.selectOnFarmAndContinue()
  await exitPage.verifyPageHeadingAndTitle()
  await exitPage.selectBackLink()
  await toFromFarmPage.verifyPageHeadingAndTitle()
  await expect(toFromFarmPage.onThefarmRadio).toBeSelected()
  await toFromFarmPage.selectBackLink()

  if (!final) {
    await checkAnswersPage.verifyPageHeadingAndTitle()
  } else {
    await finalAnswersPage.verifyPageHeadingAndTitle()
  }

  await browser.refresh()
  if (!final) {
    await expect(toFromFarmPage.onThefarmRadio).toBeExisting()
  } else {
    await taskListIncompletePage.verifyPageHeadingAndTitle()
  }
}
