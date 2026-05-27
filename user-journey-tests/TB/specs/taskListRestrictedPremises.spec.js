import taskListPage from '../page-objects/taskListPage.js'
import signInPage from '../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../helpers/authSessionManager.js'
import { completeOriginTaskAnswers } from '../helpers/testHelpers/movementOrigin.js'
import { completeDestinationTaskOffFarmBetweenRestrictedPremises } from '../helpers/testHelpers/destination.js'

describe('Task list restricted premises visibility test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session', async () => {
    await restoreSession()
  })

  it('Should show animal identification, biosecurity details and biosecurity map when moving off farm between restricted premises', async () => {
    await completeOriginTaskAnswers()
    await completeDestinationTaskOffFarmBetweenRestrictedPremises()
    await taskListPage.navigateToPageAndVerifyTitle()

    await taskListPage.verifyAllStatus([
      {
        position: 4,
        taskTitle: 'Animal identification',
        expectedStatus: 'Incomplete'
      },
      {
        position: 5,
        taskTitle: 'Biosecurity details',
        expectedStatus: 'Incomplete'
      },
      {
        position: 6,
        taskTitle: 'Biosecurity map',
        expectedStatus: 'Incomplete'
      }
    ])
  })
})
