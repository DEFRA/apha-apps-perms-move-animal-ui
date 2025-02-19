import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import completeAnimalIdentificationTask from '../../helpers/testHelpers/animalIdentification.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Check your answers test - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Complete answers', async () => {
    await completeAnimalIdentificationTask()
    await identificationAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the value and href of cattle row', async () => {
    await validateElementVisibleAndText(
      identificationAnswersPage.earTagsValue,
      '12345678'
    )
    await validateHrefOfElement(
      identificationAnswersPage.earTagsChangeLink,
      '/identification/enter-ear-tags?redirect_uri=/identification/check-answers'
    )
  })

  it('Should verify continue takes you to task list', async () => {
    await identificationAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
