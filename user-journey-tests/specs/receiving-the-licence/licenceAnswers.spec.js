import { loadPageAndVerifyTitle } from '../../helpers/page.js'
import landingPage from '../../page-objects/landingPage.js'
import { completeLicenceTaskAnswersCustom } from '../../helpers/testHelpers/receivingLicence.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { validateAndAdjustEmail } from '../../helpers/testHelpers/checkAnswers.js'

const emailDefault = 'default@email.com'
const editedEmail = 'edited@email.com'

describe('Check your licence answers test', () => {
  // eslint-disable-next-line no-undef
  before('Navigate to check answers page', async () => {
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
    await completeLicenceTaskAnswersCustom(emailDefault)
  })

  it('Should verify the back link is history -1', async () => {
    await loadPageAndVerifyTitle(emailPage.pagePath, emailPage.pageTitle)
    await emailPage.selectContinue()
    await licenceAnswersPage.selectBackLink()

    await emailPage.emailAddressInput().isDisplayed()
  })

  it('Should verify the existing email and confirm resubmission', async () => {
    await loadPageAndVerifyTitle(
      licenceAnswersPage.pagePath,
      licenceAnswersPage.pageTitle
    )
    await validateAndAdjustEmail(
      licenceAnswersPage.changeEmailLink,
      licenceAnswersPage.emailValue,
      emailDefault,
      editedEmail
    )
  })

  it('Should verify submitting answers', async () => {
    await loadPageAndVerifyTitle(
      licenceAnswersPage.pagePath,
      licenceAnswersPage.pageTitle
    )
    await licenceAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle(taskListPage.pageHeading)
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
  })
})
