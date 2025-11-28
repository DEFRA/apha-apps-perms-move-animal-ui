import landingPage from '../../page-objects/landingPage.js'
import { completeLicenceTaskAnswersCustom } from '../../helpers/testHelpers/receivingLicence.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import {
  validateAndAdjustEmail,
  validateAndAdjustOwnerName
} from '../../helpers/testHelpers/checkAnswers.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import { completeOriginTaskAnswersOnFarm } from '../../helpers/testHelpers/movementOrigin.js'
import { completeDestinationTaskOnFarmForUnrestrictedOrigin } from '../../helpers/testHelpers/destination.js'
import destinationEmailAddressPage from '../../page-objects/receiving-the-licence/destinationEmailAddressPage.js'

const firstNameDefault = 'defaultFirst'
const lastNameDefault = 'defaultLast'
const newFirstName = 'newFirst'
const newLastName = 'newLast'
const emailDefault = 'eoin.corr@esynergy.co.uk'
const editedEmail = 'edited@email.com'

describe('Check your licence answers test', () => {
  before('Sign in and complete licence task', async () => {
    await loginAndSaveSession(signInPage)
    await landingPage.navigateToPageAndVerifyTitle()
    await completeOriginTaskAnswersOnFarm()
    await completeDestinationTaskOnFarmForUnrestrictedOrigin()
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

  it('Should verify the existing email and confirm resubmission', async () => {
    await licenceAnswersPage.navigateToPageAndVerifyTitle()
    await validateAndAdjustEmail(
      licenceAnswersPage.getChangeLink('destinationEmail'),
      licenceAnswersPage.getValue('destinationEmail'),
      emailDefault,
      editedEmail,
      destinationEmailAddressPage
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
