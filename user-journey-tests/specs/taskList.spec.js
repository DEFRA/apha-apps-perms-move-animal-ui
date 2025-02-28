import taskListPage from '../page-objects/taskListPage.js'
import toFromFarmPage from '../page-objects/origin/toFromFarmPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import taskListIncompletePage from '../page-objects/taskListIncompletePage.js'
import { completeOriginTaskAnswersOnFarm } from '../helpers/testHelpers/movementLicence.js'
import completeLicenceTaskAnswers from '../helpers/testHelpers/receivingLicence.js'
import licenceAnswersPage from '../page-objects/receiving-the-licence/licenceAnswersPage.js'
import { completeDestinationTaskOnFarm } from '../helpers/testHelpers/destination.js'
import destinationAnswersPage from '../page-objects/destination/destinationAnswersPage.js'
import ownerNamePage from '../page-objects/receiving-the-licence/ownerNamePage.js'
import completeBiosecurityTask from '../helpers/testHelpers/biosecurity.js'
import completeBiosecurityMapTask from '../helpers/testHelpers/biosecurityMap.js'
import biosecurityAnswersPage from '../page-objects/biosecurity/biosecurityAnswersPage.js'
import biosecurityMapAnswersPage from '../page-objects/biosecurity-map/biosecurityMapAnswersPage.js'
import completeAnimalIdentificationTask from '../helpers/testHelpers/animalIdentification.js'
import { secureDeviceArray } from '../helpers/constants.js'
import identificationAnswersPage from '../page-objects/identification/identificationAnswersPage.js'

describe('Task list page test', () => {
  beforeEach('Navigate to task list page', async () => {
    await taskListPage.navigateToPageAndVerifyTitle()
  })

  it('Should display the correct statuses before an application has been started', async () => {
    await taskListPage.verifyAllStatus([
      {
        position: 1,
        taskTitle: 'Movement origin',
        expectedStatus: 'Incomplete'
      },
      {
        position: 2,
        taskTitle: 'Movement destination',
        expectedStatus: 'Cannot start yet'
      },
      {
        position: 3,
        taskTitle: 'Receiving the licence',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toBe('3 out of 3')
  })

  it('Should link to movement origin first question before an application has been started', async () => {
    await taskListPage.selectMovementOrigin(toFromFarmPage)
    await toFromFarmPage.verifyPageHeadingAndTitle()
  })

  it('Should link to receiving the licence first question before an application has been started', async () => {
    await taskListPage.selectReceiveTheLicence(ownerNamePage)
  })

  it('Should link to movement origin summary once that selection has been completed', async () => {
    await completeOriginTaskAnswersOnFarm()
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.verifyAllStatus([
      {
        position: 1,
        taskTitle: 'Movement origin',
        expectedStatus: 'Completed'
      },
      {
        position: 2,
        taskTitle: 'Movement destination',
        expectedStatus: 'Incomplete'
      },
      {
        position: 3,
        taskTitle: 'Receiving the licence',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toBe('2 out of 3')
    await taskListPage.selectMovementOrigin(checkAnswersPage)
  })

  it(`Should route the user to task incomplete page if they haven't completed the user journey`, async () => {
    await taskListPage.selectReview()
    await taskListIncompletePage.verifyPageHeadingAndTitle()
  })

  it('Should verify completed destination task', async () => {
    await completeDestinationTaskOnFarm()
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.verifyAllStatus([
      {
        position: 1,
        taskTitle: 'Movement origin',
        expectedStatus: 'Completed'
      },
      {
        position: 2,
        taskTitle: 'Movement destination',
        expectedStatus: 'Completed'
      },
      {
        position: 3,
        taskTitle: 'Receiving the licence',
        expectedStatus: 'Incomplete'
      },
      {
        position: 4,
        taskTitle: 'Biosecurity details',
        expectedStatus: 'Incomplete'
      },
      {
        position: 5,
        taskTitle: 'Biosecurity map',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toBe('3 out of 5')
    await taskListPage.selectMovementDestination(destinationAnswersPage)
  })

  it('Should link to receiving licence check-answers page once that selection has been completed', async () => {
    await completeLicenceTaskAnswers()
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.verifyAllStatus([
      {
        position: 1,
        taskTitle: 'Movement origin',
        expectedStatus: 'Completed'
      },
      {
        position: 2,
        taskTitle: 'Movement destination',
        expectedStatus: 'Completed'
      },
      {
        position: 3,
        taskTitle: 'Receiving the licence',
        expectedStatus: 'Completed'
      },
      {
        position: 4,
        taskTitle: 'Biosecurity details',
        expectedStatus: 'Incomplete'
      },
      {
        position: 5,
        taskTitle: 'Biosecurity map',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toContain('2 out of 5')
    await taskListPage.selectReceiveTheLicence(licenceAnswersPage)
  })

  it.skip('Should link to receiving licence check-answers page once that selection has been completed', async () => {
    await completeAnimalIdentificationTask()
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.verifyAllStatus([
      {
        position: 1,
        taskTitle: 'Movement origin',
        expectedStatus: 'Completed'
      },
      {
        position: 2,
        taskTitle: 'Movement destination',
        expectedStatus: 'Completed'
      },
      {
        position: 3,
        taskTitle: 'Receiving the licence',
        expectedStatus: 'Completed'
      },
      {
        position: 4,
        taskTitle: 'Animal identification',
        expectedStatus: 'Completed'
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

    expect(await taskListPage.getTaskToCompleteCount()).toContain('2 out of 5')
    await taskListPage.selectAnimalIdentificationLink(identificationAnswersPage)
  })

  it('Should link should link to Biosecurity details check-answers page once that section has been complete', async () => {
    await completeBiosecurityTask('yes')
    await taskListPage.navigateToPageAndVerifyTitle()
    await taskListPage.verifyAllStatus([
      {
        position: 1,
        taskTitle: 'Movement origin',
        expectedStatus: 'Completed'
      },
      {
        position: 2,
        taskTitle: 'Movement destination',
        expectedStatus: 'Completed'
      },
      {
        position: 3,
        taskTitle: 'Receiving the licence',
        expectedStatus: 'Completed'
      },
      {
        position: 4,
        taskTitle: 'Biosecurity details',
        expectedStatus: 'Completed'
      },
      {
        position: 5,
        taskTitle: 'Biosecurity map',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toContain('1 out of 5')
    await taskListPage.selectBiosecurityLink(biosecurityAnswersPage)
  })

  it('Should link should link to Biosecurity map check-answers page once that section has been complete', async () => {
    if (
      !secureDeviceArray.includes(browser.capabilities?.deviceName) &&
      browser.capabilities?.browserName !== 'Safari'
    ) {
      await completeBiosecurityMapTask()
      await taskListPage.navigateToPageAndVerifyTitle()
      await taskListPage.verifyAllStatus([
        {
          position: 1,
          taskTitle: 'Movement origin',
          expectedStatus: 'Completed'
        },
        {
          position: 2,
          taskTitle: 'Movement destination',
          expectedStatus: 'Completed'
        },
        {
          position: 3,
          taskTitle: 'Receiving the licence',
          expectedStatus: 'Completed'
        },
        {
          position: 4,
          taskTitle: 'Biosecurity details',
          expectedStatus: 'Completed'
        },
        {
          position: 5,
          taskTitle: 'Biosecurity map',
          expectedStatus: 'Completed'
        }
      ])

      expect(await taskListPage.getTaskToCompleteCount()).toContain(
        'You have completed all sections.'
      )
      await taskListPage.selectBiosecurityMapLink(biosecurityMapAnswersPage)
    }
  })
})
