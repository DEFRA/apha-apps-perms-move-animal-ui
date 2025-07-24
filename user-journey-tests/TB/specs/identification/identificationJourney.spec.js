import calvesPage from '../../page-objects/identification/calvesPage.js'
import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import oldestCalfDobPage from '../../page-objects/identification/oldestCalfDobPage.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'
import earTagsCalvesPage from '../../page-objects/identification/earTagsCalvesPage.js'
import cattleOver42DaysPage from '../../page-objects/identification/cattleOver42DaysPage.js'
import earTagsOver42DaysOldPage from '../../page-objects/identification/earTagsOver42DaysOldPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { completeIdentificationTaskLongWay } from '../../helpers/testHelpers/animalIdentification.js'

const redirect = `?redirect_uri=/${identificationAnswersPage.pagePath}`

describe('Identification journey spec (with warning page)', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await completeIdentificationTaskLongWay()
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
      expectedHref: `/${earTagsOver42DaysOldPage.pagePath}${redirect}`
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
