import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager'
import { enableIdentification } from '../../helpers/testHelpers/flow-helpers/enableIdentification.js'
import taskListPage from '../../page-objects/taskListPage'
import signInPage from '../../page-objects/signInPage.js'

describe('Identification - task list appearance', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  beforeEach(async () => [await restoreSession()])

  it('Should verify identification appears when tb restricted options selected', async () => {
    await enableIdentification()
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Animal identification',
      expectedStatus: 'Incomplete'
    })
  })

  it('Should verify identification appears when zoo options selected', async () => {
    await enableIdentification(true, true)
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Animal identification',
      expectedStatus: 'Incomplete'
    })
  })
})
