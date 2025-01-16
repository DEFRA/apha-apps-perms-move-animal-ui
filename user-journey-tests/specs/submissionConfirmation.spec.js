import {
  waitForPagePath,
  validateElementVisibleAndText
} from '../helpers/page.js'
import landingPage from '../page-objects/landingPage.js'
import { completeOriginTaskAnswersCustom } from '../helpers/testHelpers/movementLicence.js'
import { completeLicenceTaskAnswersCustom } from '../helpers/testHelpers/receivingLicence.js'
import finalAnswersPage from '../page-objects/finalAnswersPage.js'
import licenceAnswersPage from '../page-objects/receiving-the-licence/licenceAnswersPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import taskListPage from '../page-objects/taskListPage.js'
import submissionConfirmationPage from '../page-objects/submissionConfirmationPage.js'
import completeDestinationTask from '../helpers/testHelpers/destination.js'
import destinationAnswersPage from '../page-objects/destination/destinationAnswersPage.js'

const emailDefault = 'default@email.com'
const defaultCphNumber = '23/678/1234'
const defaultLineOne = 'default line one'
const defaultTownOrCity = 'default Gotham'
const defaultPostcode = 'NB2A 1GG'

const slaText =
  'It can take up to 5 working days to process your application. It may take longer if veterinary checks are required, or we need further information.'

describe('Submission confirmation test', () => {
  // eslint-disable-next-line
  before('Navigate to submission confirmation page', async () => {
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

    await completeLicenceTaskAnswersCustom(emailDefault)
    await licenceAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
    await finalAnswersPage.navigateToPageAndVerifyTitle()
    await finalAnswersPage.selectADeclarationAndContinue(true)
  })

  it('Should show the confirmation page with the expected information', async () => {
    await waitForPagePath(submissionConfirmationPage.pagePath)
    await submissionConfirmationPage.verifyPageHeadingAndTitle()
    await validateElementVisibleAndText(
      submissionConfirmationPage.slaText,
      slaText
    )
  })
})
