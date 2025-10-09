import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import checkAnswersPage from '../../page-objects/disposal-of-the-animal/checkAnswersPage.js'
import wholeAnimalYesNoPage from '../../page-objects/disposal-of-the-animal/wholeAnimalYesNoPage.js'

import {
  completeDisposalOfAnimalSection,
  DISPOSAL_ROUTES
} from '../../helpers/journey-helpers/disposalOfTheAnimal.js'
import { verifyCheckAnswersPageShort } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'

const journeyData = {
  wholeAnimal: { expected: 'Yes', hrefSuffix: 'whole-animal' },
  disposalDate: { expected: '1 January 2050', hrefSuffix: 'disposal-date' },
  carcassesDestination: {
    expected: 'Rendering plant',
    hrefSuffix: 'carcasses-destination'
  },
  destinationBusinessName: {
    expected: 'Acme Processing Ltd',
    hrefSuffix: 'destination-business-name'
  },
  destinationContactNumber: {
    expected: '01234567890',
    hrefSuffix: 'destination-contact-number'
  }
}

describe('Disposal of the animal — Whole animal route', () => {
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

  it('completes the whole-animal disposal journey and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Disposal of the animal',
      expectedStatus: 'Incomplete'
    })
    await taskListPage.selectDisposalLink(wholeAnimalYesNoPage)

    await completeDisposalOfAnimalSection({
      route: DISPOSAL_ROUTES.WHOLE_ANIMAL,
      startFromFirstPage: true
    })

    await checkAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )

    await verifyCheckAnswersPageShort({
      journeyData,
      checkAnswersPage
    })

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Disposal of the animal',
      expectedStatus: 'Completed'
    })
  })
})
