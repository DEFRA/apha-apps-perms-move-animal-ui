import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import calvesPage from '../../page-objects/identification/calvesPage.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'
import earTagsPage from '../../page-objects/identification/earTagsPage.js'

const redirect = `?redirect_uri=/${identificationAnswersPage.pagePath}`

describe('Check your answers test - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete answers', async () => {
    await loginAndSaveSession(signInPage)
    await calvesPage.navigateToPageAndVerifyTitle()
    await calvesPage.selectNoAndContinue(testingDatesPage)
    await testingDatesPage.inputTextAndContinue('21/09/1995', earTagsPage)
    await earTagsPage.inputTextAndContinue(
      'ear tags',
      identificationAnswersPage
    )
  })

  const testCases = [
    {
      field: 'calvesUnder42',
      expectedValue: 'No',
      expectedHref: `/identification/any-calves${redirect}`
    },
    {
      field: 'tbTestDates',
      expectedValue: '21/09/1995',
      expectedHref: `/identification/enter-testing-dates${redirect}`
    },
    {
      field: 'earTags',
      expectedValue: 'ear tags',
      expectedHref: `/identification/enter-ear-tags${redirect}`
    }
  ]

  testCases.forEach(({ field, expectedValue, expectedHref }) => {
    it(`Should verify the value and href of ${field} row`, async () => {
      await validateElementVisibleAndText(
        await identificationAnswersPage.getValue(field),
        expectedValue
      )
      await validateHrefOfElement(
        await identificationAnswersPage.getChangeLink(field),
        expectedHref
      )
    })
  })

  it.skip('Should verify continue takes you to task list', async () => {
    await identificationAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
