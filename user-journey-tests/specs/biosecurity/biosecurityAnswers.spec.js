import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import completeBiosecurityTask from '../../helpers/testHelpers/biosecurity.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Check your answers test - destination', () => {
  // eslint-disable-next-line no-undef
  before('Copmplete answers', async () => {
    await completeBiosecurityTask('no')
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the value and href of cattle row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.incomingCattleValue,
      'No'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeIncomingCattleLink,
      '/biosecurity/kept-separately?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify continue takes you to task list', async () => {
    await biosecurityAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
