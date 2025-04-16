import calvesPage from '../../page-objects/identification/calvesPage.js'
import {
  validateElementVisibleAndText,
  validateHrefOfElement,
  waitForPagePath
} from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import oldestCalfDobPage from '../../page-objects/identification/oldestCalfDobPage.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'
import identificationWarningPage from '../../page-objects/identification/identificationWarningPage.js'
import earTagsCalvesPage from '../../page-objects/identification/earTagsCalvesPage.js'
import cattleOver42DaysPage from '../../page-objects/identification/cattleOver42DaysPage.js'
import earTagsPage from '../../page-objects/identification/earTagsPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

const redirect = `?redirect_uri=/${identificationAnswersPage.pagePath}`

describe('Identification journey spec (with warning page)', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await calvesPage.navigateToPageAndVerifyTitle()

    await calvesPage.selectYesAndContinue(oldestCalfDobPage)
    await oldestCalfDobPage.enterDateAndContinue(
      { day: '21', month: '09', year: '1995' },
      identificationWarningPage
    )
    await identificationWarningPage.selectContinue()
    await waitForPagePath(earTagsCalvesPage.pagePath)
    await earTagsCalvesPage.inputTextAndContinue(
      'ear tags calves',
      cattleOver42DaysPage
    )
    await cattleOver42DaysPage.selectYesAndContinue(testingDatesPage)
    await testingDatesPage.inputTextAndContinue('21/09/1995', earTagsPage)
    await earTagsPage.inputTextAndContinue(
      'ear tags',
      identificationAnswersPage
    )
  })

  const testCases = [
    {
      field: 'calvesUnder42',
      expectedValue: 'Yes',
      expectedHref: `/${calvesPage.pagePath}${redirect}`
    },
    {
      field: 'oldestDOB',
      expectedValue: '21 September 1995',
      expectedHref: `/${oldestCalfDobPage.pagePath}${redirect}`
    },
    {
      field: 'earTagsCalves',
      expectedValue: 'ear tags calves',
      expectedHref: `/${earTagsCalvesPage.pagePath}${redirect}`
    },
    {
      field: 'cattleOver42',
      expectedValue: 'Yes',
      expectedHref: `/${cattleOver42DaysPage.pagePath}${redirect}`
    },
    {
      field: 'tbTestDates',
      expectedValue: '21/09/1995',
      expectedHref: `/${testingDatesPage.pagePath}${redirect}`
    },
    {
      field: 'earTags',
      expectedValue: 'ear tags',
      expectedHref: `/${earTagsPage.pagePath}${redirect}`
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

  it('Should verify continue takes you to task list', async () => {
    await identificationAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
