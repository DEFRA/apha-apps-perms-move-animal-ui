import { loadPageAndVerifyTitle, waitForPagePath } from '../helpers/page.js'
import landingPage from '../page-objects/landingPage.js'
import {
  validateAndAdjustAddress,
  validateAndAdjustEmail,
  validateAndAdjustParishNumber,
  validateOnOffFarm
} from '../helpers/testHelpers/checkAnswers.js'
import { completeOriginTaskAnswersCustom } from '../helpers/testHelpers/movementLicence.js'
import { completeLicenceTaskAnswersCustom } from '../helpers/testHelpers/receivingLicence.js'
import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import licenceAnswersPage from '../page-objects/receiving-the-licence/licenceAnswersPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import submissionConfirmationPage from '../page-objects/submissionConfirmationPage.js'

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

describe('Check your final answers test', () => {
  // eslint-disable-next-line
  before('Navigate to check answers page', async () => {
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
    await completeOriginTaskAnswersCustom(
      defaultCphNumber,
      defaultLineOne,
      defaultTownOrCity,
      defaultPostcode
    )
    await checkAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle(taskListPage.pageHeading)
    await taskListPage.verifyStatus({
      position: 1,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
    await completeLicenceTaskAnswersCustom(emailDefault)
    await licenceAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle(taskListPage.pageHeading)
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
  })

  it('Should verify the back link is history -1', async () => {
    await loadPageAndVerifyTitle(taskListPage.pagePath, taskListPage.pageTitle)
    await taskListPage.selectReview()
    await finalAnswersPage.verifyPageHeadingAndTitle(
      finalAnswersPage.pageHeading
    )
    await finalAnswersPage.selectBackLink()

    await taskListPage.movementOriginLink.isDisplayed()
  })

  it('Should verify the existing radio selection from submission page', async () => {
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
    await checkAnswersPage.verifyPageHeadingAndTitle(
      finalAnswersPage.pageHeading
    )
    await await validateOnOffFarm(
      finalAnswersPage.onOffFarmChange,
      finalAnswersPage.onOffFarmValue
    )
  })

  it('Should verify the existing cph number then verify changing the cph number from submission pafe', async () => {
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
    await validateAndAdjustParishNumber(
      finalAnswersPage.parishHoldingChange,
      finalAnswersPage.parishNumberValue,
      defaultCphNumber,
      parishHoldingInput
    )
  })

  it('Should verify the existing data then verify changing the address', async () => {
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
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

  it('Should verify the existing email and confirm resubmission', async () => {
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
    validateAndAdjustEmail(
      finalAnswersPage.emailChange,
      finalAnswersPage.emailValue,
      emailDefault,
      editedEmail
    )
  })

  it('Should submit the page after selecting first declaration', async () => {
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
    await finalAnswersPage.selectADeclarationAndContinue()
    await waitForPagePath(submissionConfirmationPage.pagePath)
  })

  it('Should submit the page after selecting second declaration', async () => {
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
    await finalAnswersPage.selectADeclarationAndContinue(true)
    await waitForPagePath(submissionConfirmationPage.pagePath)
  })

  it('Should verify errors when trying to submit without selecting a declaration', async () => {
    // This test must go last because it changes the page title
    await loadPageAndVerifyTitle(
      finalAnswersPage.pagePath,
      finalAnswersPage.pageTitle
    )
    await finalAnswersPage.submissionErrorTest()
  })
})
