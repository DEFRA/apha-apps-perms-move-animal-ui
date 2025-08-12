import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeDestinationSection } from '../../helpers/journey-helpers/movementDestination.js'
import { completeMovementDetailsSection } from '../../helpers/journey-helpers/movementDetails.js'
import { completeMovementOriginSection } from '../../helpers/journey-helpers/movementOrigin.js'
import { completeReceivingLicenceSection } from '../../helpers/journey-helpers/receivingTheLicence.js'
import { submitAndVerifyApplication } from '../../helpers/function-helpers/submission.js'

describe('Product submission spec', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  it('Should complete the application through the product path and verify successful submission', async () => {
    await completeAboutMovementSection({
      startFromFirstPage: true,
      onOffVisit: 'onto-premises',
      liveAnimals: false
    })
    await completeDestinationSection({
      startFromFirstPage: true,
      liveAnimals: false
    })
    await completeMovementDetailsSection({
      startFromFirstPage: true
    })
    await completeMovementOriginSection({
      startFromFirstPage: true,
      route: 'products'
    })
    await completeReceivingLicenceSection({
      startFromFirstPage: true,
      route: 'product'
    })

    await submitAndVerifyApplication()
  })
})
