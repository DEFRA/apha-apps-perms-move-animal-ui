import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeWhereVisitTakesPlaceSection } from '../../helpers/journey-helpers/locationOfVisit.js'
import { completeVisitDetailsSection } from '../../helpers/journey-helpers/visitDetails.js'
import { completeReceivingLicenceSection } from '../../helpers/journey-helpers/receivingTheLicence.js'
import { submitAndVerifyApplication } from '../../helpers/function-helpers/submission.js'

describe('Visit submission spec', async () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  it('Should complete the application through the visit path and verify successful submission', async () => {
    await completeAboutMovementSection({
      startFromFirstPage: true
    })
    await completeWhereVisitTakesPlaceSection({
      startFromFirstPage: true,
      locationType: 'domestic-residence'
    })
    await completeVisitDetailsSection({
      startFromFirstPage: true
    })
    await completeReceivingLicenceSection({
      startFromFirstPage: true,
      route: 'visit'
    })

    await submitAndVerifyApplication()
  })
})
