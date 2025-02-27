import { selectElement } from '../helpers/page.js'
import {
  validateAndAdjustAddress,
  validateAndAdjustEmail,
  validateAndAdjustOwnerName,
  validateAndAdjustParishNumber,
  validateOnOffFarm,
  validateOriginType,
  validateReceiveMethod
} from '../helpers/testHelpers/checkAnswers.js'
import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import destinationSelectionPage from '../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../page-objects/destination/generalLicencePage.js'
import { completeApplication } from '../helpers/testHelpers/finalAnswers.js'
import taskListIncompletePage from '../page-objects/taskListIncompletePage.js'

const originDefaultObject = {
  defaultCphNumber: '23/678/1234',
  defaultLineOne: 'default line one',
  defaultTownOrCity: 'default Gotham',
  defaultPostcode: 'NB2A 1GG'
}

const licenceDefaultObject = {
  firstNameDefault: 'firstName',
  lastNameDefault: 'lastName',
  emailDefault: 'default@email.com'
}

const newFirstName = 'newFirst'
const newLastName = 'newLast'
const editedEmail = 'edited@email.com'

const parishHoldingInput = '45/456/4567'
const lineOne = 'edited line one'
const lineTwo = 'edited line two'
const townOrCity = 'Gotham edited'
const county = 'West new york edited'
const postcode = 'SW1C 2CC'

describe('Check your final answers test', () => {
  // eslint-disable-next-line
  before('Navigate to check answers page', async () => {
    await completeApplication(originDefaultObject, licenceDefaultObject)
  })

  it('Should verify the back link is history -1', async () => {
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.selectReview()
    await finalAnswersPage.verifyPageHeadingAndTitle()
    await finalAnswersPage.selectBackLink()

    await taskListPage.movementOriginLink.isDisplayed()
  })

  it('Should verify the existing on off farm selection from submission page', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateOnOffFarm(
      finalAnswersPage.onOffFarmChange,
      finalAnswersPage.onOffFarmValue,
      finalAnswersPage
    )
  })

  it('Should verify the existing origin type selection from submission page', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateOriginType(
      finalAnswersPage.originTypeChange,
      finalAnswersPage.originTypeValue,
      finalAnswersPage
    )
  })

  it('Should verify the existing cph number then verify changing the cph number from submission page', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustParishNumber(
      finalAnswersPage.parishHoldingChange,
      finalAnswersPage.parishNumberValue,
      originDefaultObject.defaultCphNumber,
      parishHoldingInput,
      finalAnswersPage
    )
  })

  it('Should verify the existing data then verify changing the address', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustAddress(
      finalAnswersPage.addressChange,
      finalAnswersPage.addressValue,
      {
        lineOne: originDefaultObject.defaultLineOne,
        townOrCity: originDefaultObject.defaultTownOrCity,
        postcode: originDefaultObject.defaultPostcode
      },
      { lineOne, lineTwo, townOrCity, county, postcode }
    )
  })

  it('Should verify existing name and then changing it', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustOwnerName(
      finalAnswersPage.ownerNameChange,
      finalAnswersPage.ownerNameValue,
      licenceDefaultObject.firstNameDefault,
      newFirstName,
      licenceDefaultObject.lastNameDefault,
      newLastName
    )
  })

  it('Should verify the existing email and confirm resubmission', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustEmail(
      finalAnswersPage.emailChange,
      finalAnswersPage.emailValue,
      licenceDefaultObject.emailDefault,
      editedEmail
    )
  })

  it('Should verify the method to receive the licence', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    validateReceiveMethod(
      finalAnswersPage.receiveMethodChange,
      finalAnswersPage.receiveMethodValue
    )
  })

  it('Should go via the general licence page if the destination type is changed to "slaughter", and end up on task-list incomplete', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()

    await selectElement(finalAnswersPage.movementDestinationChange)

    await expect(destinationSelectionPage.approvedFinishingRadio).toBeSelected()

    await destinationSelectionPage.selectSlaughterRadioAndContinue(
      generalLicencePage
    )
    await generalLicencePage.selectContinueLink()
    await taskListIncompletePage.verifyPageHeadingAndTitle()
  })
})
