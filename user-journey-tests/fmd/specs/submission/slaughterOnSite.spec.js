// user-journey-tests/fmd/specs/end-to-end/slaughterOnSite.spec.js

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

import {
  completeSlaughterInformationSection,
  PROVIDER
} from '../../helpers/journey-helpers/slaughterInformation.js'

import {
  completeDisposalOfAnimalSection,
  DISPOSAL_ROUTES
} from '../../helpers/journey-helpers/disposalOfTheAnimal.js'

import {
  completeReceivingLicenceSection,
  LICENCE_RECIPIENT
} from '../../helpers/journey-helpers/receivingTheLicence.js'

import { submitAndVerifyApplication } from '../../helpers/function-helpers/submission.js'

describe('End-to-end — Slaughter on site', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('completes Movement origin, Slaughter information, Disposal, Receiving the licence and submits', async () => {
    await completeAboutMovement({
      movementContext: 'slaughter-onsite',
      startFromFirstPage: true
    })

    await completeMovementOriginSection({
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: false,
      slaughterOrCarcass: true,
      premisesType: PREMISES.FARM,
      animalsSelections: [ANIMALS.CATTLE],
      startFromFirstPage: true
    })

    await completeSlaughterInformationSection({
      provider: PROVIDER.SLAUGHTERMAN,
      nameFirst: 'John',
      nameLast: 'Doe',
      businessPhone: '07123456789',
      slaughterDate: { day: '07', month: '03', year: '2050' },
      startFromFirstPage: true
    })

    await completeDisposalOfAnimalSection({
      route: DISPOSAL_ROUTES.WHOLE_ANIMAL,
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
