import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeCarcassesMovementSection } from '../../helpers/journey-helpers/movementDetails.js'
import { submitAndVerifyApplication } from '../../helpers/function-helpers/submission.js'
import {
  completeMovementOriginSection,
  ORIGIN_ROUTE,
  PREMISES,
  ANIMALS
} from '../../helpers/journey-helpers/movementOrigin.js'

import {
  completeReceivingLicenceSection,
  LICENCE_RECIPIENT
} from '../../helpers/journey-helpers/receivingTheLicence.js'
import { completeMovementDestinationCarcasses } from '../../helpers/journey-helpers/movementDestination.js'

describe('Movement details — carcasses', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Should complete movement details carcasses journey and verify CYA', async () => {
    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'carcasses',
      startFromFirstPage: true
    })

    await completeMovementOriginSection({
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: false,
      slaughterOrCarcass: true,
      premisesType: PREMISES.FARM,
      cph: '12/345/6789',
      address: {
        lineOne: '1 Test Lane',
        lineTwo: 'line 2',
        townOrCity: 'Testtown',
        county: 'Testshire',
        postcode: 'TE1 1ST'
      },
      gridRef: 'ST 12345 67890',
      animalsSelections: [ANIMALS.CATTLE],
      startFromFirstPage: true
    })

    await completeMovementDestinationCarcasses({
      youMoving: 'yes',
      destinationType: 'rendering-plant',
      businessName: 'Acme Processing Ltd',
      businessPhone: '01234567890',
      knowAddress: 'yes',
      address: {
        lineOne: '99 Processing Park',
        lineTwo: 'Unit 7',
        townOrCity: 'Meatville',
        county: 'Testshire',
        postcode: 'TE9 9ZZ'
      },
      hasCph: false,
      startFromFirstPage: true
    })

    await completeCarcassesMovementSection({
      startFromFirstPage: true,
      disposalDate: { day: '07', month: '03', year: '2050' }
    })

    await completeReceivingLicenceSection({
      recipient: LICENCE_RECIPIENT.NOT_MILK,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'eoin.corr@esynergy.co.uk',
      startFromFirstPage: true
    })

    await submitAndVerifyApplication()
  })
})
