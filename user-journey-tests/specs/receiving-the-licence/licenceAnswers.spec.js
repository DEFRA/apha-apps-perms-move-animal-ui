import landingPage from '../../page-objects/landingPage.js'
import { completeLicenceTaskAnswersCustom } from '../../helpers/testHelpers/receivingLicence.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import {
  validateAndAdjustEmail,
  validateAndAdjustOwnerName,
  validateReceiveMethod
} from '../../helpers/testHelpers/checkAnswers.js'

const firstNameDefault = 'defaultFirst'
const lastNameDefault = 'defaultLast'
const newFirstName = 'newFirst'
const newLastName = 'newLast'
const emailDefault = 'default@email.com'
const editedEmail = 'edited@email.com'

describe('Check your licence answers test', () => {
  // eslint-disable-next-line no-undef
  before('Navigate to check answers page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
    await completeLicenceTaskAnswersCustom(
      emailDefault,
      firstNameDefault,
      lastNameDefault
    )
  })

  it('Should verify the back link is history -1', async () => {
    await emailPage.navigateToPageAndVerifyTitle()
    await emailPage.selectContinue()
    await licenceAnswersPage.selectBackLink()

    await emailPage.emailAddressInput().isDisplayed()
  })

  it('Should verify existing name and then changing it', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustOwnerName(
      licenceAnswersPage.changeNameLink,
      licenceAnswersPage.nameValue,
      firstNameDefault,
      newFirstName,
      lastNameDefault,
      newLastName
    )
  })

  it('Should verify the method to receive the licence', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    validateReceiveMethod(
      licenceAnswersPage.changeMethodLink,
      licenceAnswersPage.receiveMethodValue
    )
  })

  it('Should verify the existing email and confirm resubmission', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustEmail(
      licenceAnswersPage.changeEmailLink,
      licenceAnswersPage.emailValue,
      emailDefault,
      editedEmail
    )
  })

  it('Should verify submitting answers', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    await licenceAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
  })
})
