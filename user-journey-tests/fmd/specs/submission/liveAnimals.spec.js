// user-journey-tests/fmd/specs/end-to-end/liveAnimalsOff.spec.js

import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import {
  completeMovementOriginSection,
  ORIGIN_ROUTE,
  PREMISES,
  ANIMALS
} from '../../helpers/journey-helpers/movementOrigin.js'
import { completeLiveAnimalsDestination } from '../../helpers/journey-helpers/movementDestination.js'
import { completeLiveAnimalsMovementSection } from '../../helpers/journey-helpers/movementDetails.js'
import {
  completeReceivingLicenceSection,
  LICENCE_RECIPIENT
} from '../../helpers/journey-helpers/receivingTheLicence.js'
import { submitAndVerifyApplication } from '../../helpers/function-helpers/submission.js'

describe('End-to-end — Movement off, live animals (non-slaughter)', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('completes all sections for live animals off-farm and submits', async () => {
    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'live-animals',
      toSlaughter: false,
      startFromFirstPage: true
    })

    await completeMovementOriginSection({
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: false,
      slaughterOrCarcass: false,
      premisesType: PREMISES.FARM,
      cph: '12/345/6789',
      address: {
        lineOne: '1 Test Lane',
        lineTwo: 'line 2',
        townOrCity: 'Testtown',
        county: 'Testshire',
        postcode: 'TE1 1ST'
      },
      animalsSelections: [ANIMALS.CATTLE],
      startFromFirstPage: true
    })

    await completeLiveAnimalsDestination({
      slaughter: false,
      businessName: 'Green Pastures Holding',
      businessPhone: '01234567890',
      knowAddress: 'yes',
      address: {
        lineOne: '42 Field View',
        lineTwo: 'Unit B',
        townOrCity: 'Stockton',
        county: 'Testshire',
        postcode: 'TE4 2AB'
      },
      hasCph: false,
      startFromFirstPage: true
    })

    await completeLiveAnimalsMovementSection({
      twoWeekRepeat: 'yes',
      movementStart: { day: '10', month: '04', year: '2026' },
      movementEnd: { day: '24', month: '04', year: '2026' },
      maximumDaysAnimals: '7',
      maxJourneys: '3',
      startFromFirstPage: true
    })

    await completeReceivingLicenceSection({
      recipient: LICENCE_RECIPIENT.NOT_MILK,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'applicant@example.com',
      startFromFirstPage: true
    })

    await submitAndVerifyApplication()
  })
})
