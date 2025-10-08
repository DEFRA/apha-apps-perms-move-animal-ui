// user-journey-tests/fmd/specs/end-to-end/milkProducer.spec.js

import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import {
  completeMovementOriginSection,
  ORIGIN_ROUTE,
  PREMISES
} from '../../helpers/journey-helpers/movementOrigin.js'
import { completeMovementDestinationMilk } from '../../helpers/journey-helpers/movementDestination.js'
import { completeMilkMovementSection } from '../../helpers/journey-helpers/movementDetails.js'
import {
  completeReceivingLicenceSection,
  LICENCE_RECIPIENT
} from '../../helpers/journey-helpers/receivingTheLicence.js'
import { submitAndVerifyApplication } from '../../helpers/function-helpers/submission.js'

describe('End-to-end — Movement off, milk (producer route)', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('completes all sections for milk (producer) and submits', async () => {
    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'milk',
      producerDairy: 'producer',
      startFromFirstPage: true
    })

    await completeMovementOriginSection({
      route: ORIGIN_ROUTE.MILK,
      premisesType: PREMISES.FARM,
      cph: '12/345/6789',
      address: {
        lineOne: '1 Test Lane',
        lineTwo: 'line 2',
        townOrCity: 'Testtown',
        county: 'Testshire',
        postcode: 'TE1 1ST'
      },
      startFromFirstPage: true
    })

    await completeMovementDestinationMilk({
      purchaser: 'Test Dairy Co',
      startFromFirstPage: true
    })

    await completeMilkMovementSection({
      variant: 'producer',
      twoWeekRepeat: 'yes',
      movementStart: { day: '10', month: '04', year: '2026' },
      maximumJourneys: '2',
      startFromFirstPage: true
    })

    await completeReceivingLicenceSection({
      recipient: LICENCE_RECIPIENT.MILK_PRODUCER,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'applicant@example.com',
      startFromFirstPage: true
    })

    await submitAndVerifyApplication()
  })
})
