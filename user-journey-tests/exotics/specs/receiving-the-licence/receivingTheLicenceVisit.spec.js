import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import whoIsResponsiblePage from '../../page-objects/receiving-the-licence/whoIsResponsiblePage.js'
import receiveMethodPage from '../../page-objects/receiving-the-licence/receiveMethodPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import checkAnswersPage from '../../page-objects/receiving-the-licence/checkAnswersPage.js'

const basePath = '/exotics/receiving-the-licence'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  name: {
    expected: 'FirstName LastName',
    hrefSuffix: 'visit/responsible-person-name'
  },
  receiveMethod: {
    expected: 'Email',
    hrefSuffix: 'email-or-post'
  },
  email: {
    expected: 'test@test.co.uk',
    hrefSuffix: 'enter-email-address'
  }
}

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Receiving the licence - visit', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection('visit')
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the receiving the licence section for a visit', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectReceivingLicence(whoIsResponsiblePage)
    await whoIsResponsiblePage.inputTextAndContinue(
      'FirstName',
      'LastName',
      receiveMethodPage
    )
    await receiveMethodPage.selectEmailAndContinue(emailPage)
    await emailPage.inputTextAndContinue('test@test.co.uk', checkAnswersPage)

    for (const key of Object.keys(journeyData)) {
      const valueEl = await checkAnswersPage.getValue(key)
      const changeLink = await checkAnswersPage.getChangeLink(key)

      await expect(valueEl).toHaveTextContaining(getExpected(key))
      await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
    }

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
  })
})
