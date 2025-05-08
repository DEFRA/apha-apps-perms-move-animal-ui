import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import finalAnswersPage from '../../page-objects/finalAnswersPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import landingPage from '../../page-objects/landingPage.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { completeIdentificationTaskLongWay } from './animalIdentification.js'
import completeBiosecurityTask from './biosecurity.js'
import completeBiosecurityMapTask from './biosecurityMap.js'
import completeDestinationTask, {
  completeDestinationTaskOnFarmForUnrestrictedOrigin
} from './destination.js'
import {
  completeOriginTaskAnswersCustom,
  completeOriginTaskAnswersOnFarm
} from './movementOrigin.js'
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
  await finalAnswersPage.navigateToPageAndVerifyTitle()
}

export const completeApplicationOnFarm = async ({ licence }) => {
  await landingPage.navigateToPageAndVerifyTitle()
  await completeOriginTaskAnswersOnFarm()
  await checkAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()

  await completeDestinationTaskOnFarmForUnrestrictedOrigin()
  await destinationAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()

  await completeLicenceTaskAnswersCustom(
    licence.emailDefault,
    licence.firstNameDefault,
    licence.lastNameDefault,
    true
  )
  await licenceAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()

  await completeIdentificationTaskLongWay()
  await identificationAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()

  await completeBiosecurityTask('yes')
  await biosecurityAnswersPage.selectContinue()
  await taskListPage.verifyPageHeadingAndTitle()

  await completeBiosecurityMapTask()
  await taskListPage.navigateToPageAndVerifyTitle()
  await finalAnswersPage.navigateToPageAndVerifyTitle()
}
