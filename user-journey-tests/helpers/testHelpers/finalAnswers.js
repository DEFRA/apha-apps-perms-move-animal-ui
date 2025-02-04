import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage'
import finalAnswersPage from '../../page-objects/finalAnswersPage'
import landingPage from '../../page-objects/landingPage'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage'
import taskListPage from '../../page-objects/taskListPage'
import completeDestinationTask from './destination'
import { completeOriginTaskAnswersCustom } from './movementLicence'
import { completeLicenceTaskAnswersCustom } from './receivingLicence'

export const completeApplication = async (originObject, licenceObject) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await completeOriginTaskAnswersCustom(
    originObject.defaultCphNumber,
    originObject.defaultLineOne,
    originObject.defaultTownOrCity,
    originObject.defaultPostcode
  )
  await checkAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
  await taskListPage.verifyStatus({
    position: 1,
    taskTitle: 'Movement origin',
    expectedStatus: 'Completed'
  })

  await completeDestinationTask('approved')
  await destinationAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
  await taskListPage.verifyStatus({
    position: 2,
    taskTitle: 'Movement destination',
    expectedStatus: 'Completed'
  })

  await completeLicenceTaskAnswersCustom(
    licenceObject.emailDefault,
    licenceObject.firstNameDefault,
    licenceObject.lastNameDefault
  )
  await licenceAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()
  await taskListPage.verifyStatus({
    position: 3,
    taskTitle: 'Receiving the licence',
    expectedStatus: 'Completed'
  })
  await finalAnswersPage.navigateToPageAndVerifyTitle()
}
