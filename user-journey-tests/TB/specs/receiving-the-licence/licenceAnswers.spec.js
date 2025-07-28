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
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import { completeOriginTaskAnswersOnFarm } from '../../helpers/testHelpers/movementOrigin.js'

const firstNameDefault = 'defaultFirst'
const lastNameDefault = 'defaultLast'
const newFirstName = 'newFirst'
const newLastName = 'newLast'
const emailDefault = 'default@email.com'
const editedEmail = 'edited@email.com'

describe('Check your licence answers test', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete licence task', async () => {
    await loginAndSaveSession(signInPage)
    await landingPage.navigateToPageAndVerifyTitle()
    await completeOriginTaskAnswersOnFarm()
    await completeLicenceTaskAnswersCustom(
      emailDefault,
      firstNameDefault,
      lastNameDefault,
      true
    )
  })

  it('Should verify the back link is history -1', async () => {
    await emailPage.navigateToPageAndVerifyTitle()
    await emailPage.selectContinue()
    await licenceAnswersPage.selectBackLink()

    await emailPage.textInput().isDisplayed()
  })

  it('Should verify existing name and then changing it', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustOwnerName(
      licenceAnswersPage.getChangeLink('name'),
      licenceAnswersPage.getValue('name'),
      firstNameDefault,
      newFirstName,
      lastNameDefault,
      newLastName
    )
  })

  it('Should verify the method to receive the licence', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    validateReceiveMethod(
      licenceAnswersPage.getChangeLink('receiveMethod'),
      licenceAnswersPage.getValue('receiveMethod')
    )
  })

  it('Should verify the existing email and confirm resubmission', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustEmail(
      licenceAnswersPage.getChangeLink('email'),
      licenceAnswersPage.getValue('email'),
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
