import { waitForPagePath } from '../helpers/page.js'
import taskListPage from '../page-objects/taskListPage.js'
import toFromFarmPage from '../page-objects/origin/toFromFarmPage.js'
import checkAnswersPage from '../page-objects/origin/checkAnswersPage.js'
import taskListIncompletePage from '../page-objects/taskListIncompletePage.js'
import completeOriginTaskAnswers from '../helpers/testHelpers/movementLicence.js'
import completeLicenceTaskAnswers from '../helpers/testHelpers/receivingLicence.js'
import licenceAnswersPage from '../page-objects/receiving-the-licence/licenceAnswersPage.js'
import completeDestinationTask from '../helpers/testHelpers/destination.js'
import destinationAnswersPage from '../page-objects/destination/destinationAnswersPage.js'
import ownerNamePage from '../page-objects/receiving-the-licence/ownerNamePage.js'
import completeBiosecurityTask from '../helpers/testHelpers/biosecurity.js'

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
      },
      {
        position: 4,
        taskTitle: 'Biosecurity details',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toBe('4 out of 4')
  })

  it('Should link to movement origin first question before an application has been started', async () => {
    await taskListPage.selectMovementOrigin()
    await toFromFarmPage.verifyPageHeadingAndTitle()
  })

  it('Should link to receiving the licence first question before an application has been started', async () => {
    await taskListPage.selectReceiveTheLicence()
    await waitForPagePath(ownerNamePage.pagePath)
  })

  it('Should link to movement origin summary once that selection has been completed', async () => {
    await completeOriginTaskAnswers()
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
      },
      {
        position: 4,
        taskTitle: 'Biosecurity details',
        expectedStatus: 'Incomplete'
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toBe('3 out of 4')

    await taskListPage.selectMovementOrigin()
    await checkAnswersPage.verifyPageHeadingAndTitle(
      checkAnswersPage.pageHeading
    )
    await waitForPagePath(checkAnswersPage.pagePath)
  })

  it(`Should route the user to task incomplete page if they haven't completed the user journey`, async () => {
    await taskListPage.selectReview()
    await taskListIncompletePage.verifyPageHeadingAndTitle()
  })

  it('Should verify completed destination task', async () => {
    await completeDestinationTask('slaughter')
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
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toBe('2 out of 4')

    await taskListPage.selectMovementDestination()
    await waitForPagePath(destinationAnswersPage.pagePath)
    await destinationAnswersPage.verifyPageHeadingAndTitle()
  })

  it('Should link to receiving licence summary once that selection has been completed', async () => {
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
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toContain('1 out of 4')
    await taskListPage.selectReceiveTheLicence()

    await licenceAnswersPage.verifyPageHeadingAndTitle()
    await waitForPagePath(licenceAnswersPage.pagePath)
  })

  it('Should link to receiving licence summary once that selection has been completed', async () => {
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
      }
    ])

    expect(await taskListPage.getTaskToCompleteCount()).toContain(
      'You have completed all sections.'
    )
    await taskListPage.selectReceiveTheLicence()

    await waitForPagePath(licenceAnswersPage.pagePath)
    await licenceAnswersPage.verifyPageHeadingAndTitle()
  })
})
