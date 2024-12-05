import { browser } from '@wdio/globals'

import {
  clearElement,
  loadPageAndVerifyTitle,
  selectElement,
  validateElementVisibleAndText
} from '../../helpers/page.js'
import landingPage from '../../page-objects/landingPage.js'
import completeLicenceTaskAnswers, {
  completeLicenceTaskAnswersCustom
} from '../../helpers/testHelpers/receivingLicence.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

const emailDefault = 'default@email.com'
const editedEmail = 'edited@email.com'

describe('Check your licence answers test', () => {
  beforeEach('Navigate to check answers page', async () => {
    await browser.reloadSession()
    await loadPageAndVerifyTitle('', landingPage.pageTitle)
  })

  it('Should verify the back link is history -1', async () => {
    await completeLicenceTaskAnswers()
    await licenceAnswersPage.selectBackLink()

    await emailPage.emailAddressInput().isDisplayed()
  })

  it('Should verify the existing email and confirm resubmission', async () => {
    await completeLicenceTaskAnswersCustom(emailDefault)
    await licenceAnswersPage.verifyPageHeadingAndTitle(
      licenceAnswersPage.pageHeading
    )
    await selectElement(licenceAnswersPage.changeEmailLink)

    await expect(emailPage.emailAddressInput()).toHaveValue(emailDefault)
    await clearElement(emailPage.emailAddressInput())
    await emailPage.inputEmailAndContinue(editedEmail)

    await validateElementVisibleAndText(
      licenceAnswersPage.emailValue,
      editedEmail
    )
  })

  it('Should verify submitting answers', async () => {
    await completeLicenceTaskAnswers()
    await licenceAnswersPage.selectContinue()
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
  })
})
