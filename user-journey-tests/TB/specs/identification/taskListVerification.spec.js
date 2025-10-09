import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import { enableIdentification } from '../../helpers/testHelpers/flow-helpers/enableIdentification.js'
import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Identification - task list appearance', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach(async () => {
    await restoreSession()
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify identification appears when tb restricted options selected', async () => {
    await enableIdentification({
      originZoo: false,
      destinationZoo: false
    })
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Animal identification',
      expectedStatus: 'Incomplete'
    })
  })

  it('Should verify identification appears when zoo options selected', async () => {
    await enableIdentification({
      originZoo: true,
      destinationZoo: true
    })
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Animal identification',
      expectedStatus: 'Incomplete'
    })
  })
})
