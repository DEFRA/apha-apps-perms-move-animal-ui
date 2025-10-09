import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import checkAnswersPage from '../../page-objects/slaughter-information/checkAnswersPage.js'
import slaughtermanOrKnackermanPage from '../../page-objects/slaughter-information/slaughtermanOrKnackermanPage.js'

import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import {
  completeSlaughterInformationSection,
  PROVIDER
} from '../../helpers/journey-helpers/slaughterInformation.js'

const basePath = '/fmd/slaughter-information'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  slaughterOrKnackerman: {
    expected: 'Slaughterman',
    hrefSuffix: 'slaughterman-or-knackerman'
  },
  slaughtermanName: { expected: 'John Doe', hrefSuffix: 'name' },
  businessPhone: {
    expected: '07123456789',
    hrefSuffix: 'slaughterman-contact-number'
  },
  slaughterDate: { expected: '7 March 2050', hrefSuffix: 'date-of-slaughter' }
}

describe('Slaughter information — Slaughterman route', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'slaughter-onsite',
      startFromFirstPage: true
    })
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('completes the slaughterman journey and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Slaughter information',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.selectSlaughterInfo(slaughtermanOrKnackermanPage)

    await completeSlaughterInformationSection({
      provider: PROVIDER.SLAUGHTERMAN,
      startFromFirstPage: true
    })

    await checkAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage
    })

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Slaughter information',
      expectedStatus: 'Completed'
    })
  })
})
