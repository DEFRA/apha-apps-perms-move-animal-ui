// user-journey-tests/fmd/specs/movement-destination/carcassesLongest.spec.js

import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import carcassDestinationPage from '../../page-objects/movement-destination/carcasses/carcassDestinationPage.js'
import checkAnswersPage from '../../page-objects/movement-destination/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeMovementDestinationCarcasses } from '../../helpers/journey-helpers/movementDestination.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-destination'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  destinationType: { expected: 'Rendering Plant', hrefSuffix: 'type' },
  applicantMovingCarcasses: {
    expected: 'No, a third party will move them',
    hrefSuffix: 'business-receiving-the-licence'
  },
  thirdPartyMovingName: {
    expected: 'Third Party Movers Ltd',
    hrefSuffix: 'transporting-business-name'
  },
  destinationBusinessName: {
    expected: 'Acme Rendering Ltd',
    hrefSuffix: 'business-name'
  },
  destinationBusinessPhone: {
    expected: '01234567890',
    hrefSuffix: 'contact-number'
  },
  destinationAddressKnown: {
    expected: 'Yes',
    hrefSuffix: 'business-address-yes-no'
  },
  removingBusinessAddress: {
    expected: '42 Processing Park\nUnit B\nRenderham\nTestshire\nTE4 2AA',
    hrefSuffix: 'removing-business-address'
  },
  destinationHasCphNumber: { expected: 'Yes', hrefSuffix: 'cph-number-yes-no' },
  destinationCphNumber: {
    expected: '12/345/6789',
    hrefSuffix: 'carcasses-cph-number'
  }
}

describe('Movement destination — Carcasses (longest route)', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'carcasses',
      startFromFirstPage: true
    })

    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('completes the longest carcasses destination journey and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement destination',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDestination(carcassDestinationPage)

    await completeMovementDestinationCarcasses({
      destination: 'rendering-plant',
      mover: 'third-party',
      thirdPartyName: 'Third Party Movers Ltd',
      businessName: 'Acme Rendering Ltd',
      businessPhone: '01234567890',
      knowAddress: true,
      hasCph: true,
      address: {
        lineOne: '42 Processing Park',
        lineTwo: 'Unit B',
        townOrCity: 'Renderham',
        county: 'Testshire',
        postcode: 'TE4 2AA'
      },
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
      taskTitle: 'Movement destination',
      expectedStatus: 'Completed'
    })
  })
})
