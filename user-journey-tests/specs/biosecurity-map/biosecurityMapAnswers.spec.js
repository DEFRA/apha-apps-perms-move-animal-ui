import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import completeBiosecurityMapTask from '../../helpers/testHelpers/biosecurityMap.js'
import { completeDestinationTaskOnFarmForUnrestrictedOrigin } from '../../helpers/testHelpers/destination.js'
import { completeOriginTaskAnswersOnFarm } from '../../helpers/testHelpers/movementLicence.js'
import biosecurityMapAnswersPage from '../../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Check your answers test - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Complete answers', async () => {
    await completeOriginTaskAnswersOnFarm()
    await completeDestinationTaskOnFarmForUnrestrictedOrigin()
    await completeBiosecurityMapTask()
    await biosecurityMapAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the value and href of cattle row', async () => {
    await validateElementVisibleAndText(
      biosecurityMapAnswersPage.biosecMapValue,
      'Map uploaded'
    )
    await validateHrefOfElement(
      biosecurityMapAnswersPage.biosecMapChangeLink,
      '/biosecurity-map/upload-plan?redirect_uri=/biosecurity-map/check-answers'
    )
  })

  it('Should verify continue takes you to task list', async () => {
    await biosecurityMapAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
