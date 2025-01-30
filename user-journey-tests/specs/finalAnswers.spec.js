import { selectElement, waitForPagePath } from '../helpers/page.js'
import landingPage from '../page-objects/landingPage.js'
import {
  validateAndAdjustAddress,
  validateAndAdjustEmail,
  validateAndAdjustOwnerName,
  validateAndAdjustParishNumber,
  validateOnFarmErrorHandling,
  validateOnOffFarm,
  validateOriginType,
  validateReceiveMethod
} from '../helpers/testHelpers/checkAnswers.js'
import { completeOriginTaskAnswersCustom } from '../helpers/testHelpers/movementLicence.js'
import { completeLicenceTaskAnswersCustom } from '../helpers/testHelpers/receivingLicence.js'
import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import licenceAnswersPage from '../page-objects/receiving-the-licence/licenceAnswersPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import submissionConfirmationPage from '../page-objects/submissionConfirmationPage.js'
import completeDestinationTask from '../helpers/testHelpers/destination.js'
import destinationAnswersPage from '../page-objects/destination/destinationAnswersPage.js'
import destinationSelectionPage from '../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../page-objects/destination/generalLicencePage.js'

const firstNameDefault = 'firstName'
const lastNameDefault = 'lastName'
const newFirstName = 'newFirst'
const newLastName = 'newLast'
const emailDefault = 'default@email.com'
const editedEmail = 'edited@email.com'

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

const completeApplication = async () => {
  await landingPage.navigateToPageAndVerifyTitle()
  await completeOriginTaskAnswersCustom(
    defaultCphNumber,
    defaultLineOne,
    defaultTownOrCity,
    defaultPostcode
  )
  await checkAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
  await taskListPage.verifyStatus({
    position: 1,
    taskTitle: 'Movement origin',
    expectedStatus: 'Completed'
  })

  await completeDestinationTask('approved')
  await destinationAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
  await taskListPage.verifyStatus({
    position: 2,
    taskTitle: 'Movement destination',
    expectedStatus: 'Completed'
  })

  await completeLicenceTaskAnswersCustom(
    emailDefault,
    firstNameDefault,
    lastNameDefault
  )
  await licenceAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
  await taskListPage.verifyStatus({
    position: 3,
    taskTitle: 'Receiving the licence',
    expectedStatus: 'Completed'
  })
  await finalAnswersPage.navigateToPageAndVerifyTitle()
}

describe('Check your final answers test', () => {
  beforeEach(async () => {
    await browser.deleteAllCookies()
    await completeApplication()
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
      finalAnswersPage.onOffFarmValue
    )
  })

  it('Should verify the existing origin type selection from submission page', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateOriginType(
      finalAnswersPage.originTypeChange,
      finalAnswersPage.originTypeValue
    )
  })

  it('Should verify the existing cph number then verify changing the cph number from submission page', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustParishNumber(
      finalAnswersPage.parishHoldingChange,
      finalAnswersPage.parishNumberValue,
      defaultCphNumber,
      parishHoldingInput
    )
  })

  it('Should verify the existing data then verify changing the address', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustAddress(
      finalAnswersPage.addressChange,
      finalAnswersPage.addressValue,
      {
        lineOne: defaultLineOne,
        townOrCity: defaultTownOrCity,
        postcode: defaultPostcode
      },
      { lineOne, lineTwo, townOrCity, county, postcode }
    )
  })

  it('Should verify existing name and then changing it', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustOwnerName(
      finalAnswersPage.ownerNameChange,
      finalAnswersPage.ownerNameValue,
      firstNameDefault,
      newFirstName,
      lastNameDefault,
      newLastName
    )
  })

  it('Should verify the existing email and confirm resubmission', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustEmail(
      finalAnswersPage.emailChange,
      finalAnswersPage.emailValue,
      emailDefault,
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

  it('Should go via the general licence page if the destination type is changed to "slaughter"', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()

    await selectElement(finalAnswersPage.movementDestinationChange)

    await expect(destinationSelectionPage.approvedFinishingRadio).toBeSelected()

    await destinationSelectionPage.selectSlaughterRadioAndContinue()
    await generalLicencePage.verifyPageHeadingAndTitle()
    await generalLicencePage.selectContinueLink()
    await finalAnswersPage.verifyPageHeadingAndTitle()
  })

  it('Should verify changing the value to on the farm and navigating back', async () => {
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await validateOnFarmErrorHandling(finalAnswersPage.onOffFarmChange, true)
  })

  describe('declarations', () => {
    it('Should submit the page after selecting first declaration', async () => {
      await finalAnswersPage.navigateToPageAndVerifyTitle()
      await finalAnswersPage.selectADeclarationAndContinue()
      await waitForPagePath(submissionConfirmationPage.pagePath)
    })

    it('Should submit the page after selecting second declaration', async () => {
      await finalAnswersPage.navigateToPageAndVerifyTitle()
      await finalAnswersPage.selectADeclarationAndContinue(true)
      await waitForPagePath(submissionConfirmationPage.pagePath)
    })

    it('Should verify errors when trying to submit without selecting a declaration', async () => {
      // This test must go last because it changes the page title
      await finalAnswersPage.navigateToPageAndVerifyTitle()
      await finalAnswersPage.submissionErrorTest()
    })
  })
})
