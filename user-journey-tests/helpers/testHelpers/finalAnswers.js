import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import finalAnswersPage from '../../page-objects/finalAnswersPage.js'
import landingPage from '../../page-objects/landingPage.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import completeAnimalIdentificationTask from './animalIdentification.js'
import completeBiosecurityTask from './biosecurity.js'
import completeBiosecurityMapTask from './biosecurityMap.js'
import completeDestinationTask from './destination.js'
import { completeOriginTaskAnswersCustom } from './movementLicence.js'
import { completeLicenceTaskAnswersCustom } from './receivingLicence.js'

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
  await completeAnimalIdentificationTask()
  await taskListPage.navigateToPageAndVerifyTitle()
  await taskListPage.verifyStatus({
    position: 4,
    taskTitle: 'Animal identification',
    expectedStatus: 'Completed'
  })
  await completeBiosecurityTask('yes')
  await taskListPage.navigateToPageAndVerifyTitle()
  await taskListPage.verifyStatus({
    position: 5,
    taskTitle: 'Biosecurity details',
    expectedStatus: 'Completed'
  })
  await completeBiosecurityMapTask()
  await taskListPage.navigateToPageAndVerifyTitle()
  await taskListPage.verifyStatus({
    position: 6,
    taskTitle: 'Biosecurity map',
    expectedStatus: 'Completed'
  })
  await finalAnswersPage.navigateToPageAndVerifyTitle()
}
