import { loginAndSaveSession } from '../../helpers/authSessionManager'
import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page'
import { completeDestinationTaskOnFarmForUnrestrictedOrigin } from '../../helpers/testHelpers/destination'
import { destinationVariants } from '../../helpers/testHelpers/movementOrigin'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage'
import taskListPage from '../../page-objects/taskListPage'
import signInPage from '../../page-objects/signInPage.js'

describe('Check your answers test - destination', () => {
  // eslint-disable-next-line no-undef
  before('Sign in and complete origin task', async () => {
    await loginAndSaveSession(signInPage)
    await destinationVariants(true, false)
    await completeDestinationTaskOnFarmForUnrestrictedOrigin()
  })

  const redirect = `?redirect_uri=/${destinationAnswersPage.pagePath}`

  const testCases = [
    {
      field: 'destinationType',
      expectedValue: 'Lab',
      expectedHref: `/destination/type-of-destination${redirect}`
    },
    {
      field: 'parishNumber',
      expectedValue: '12/123/1234',
      expectedHref: `/destination/destination-farm-cph${redirect}`
    },
    {
      field: 'address',
      expectedValue: /123\s*The street\s*N11AA/,
      expectedHref: `/destination/destination-farm-address${redirect}`,
      useRegex: true
    },
    {
      field: 'maxAnimals',
      expectedValue: '550',
      expectedHref: `/destination/how-many-animals${redirect}`
    },
    {
      field: 'reason',
      expectedValue: 'Routine restocking',
      expectedHref: `/destination/reason-for-movement${redirect}`
    },
    {
      field: 'restockAnimals',
      expectedValue: 'Cows',
      expectedHref: `/destination/restocking-additional-info-animal-type${redirect}`
    },
    {
      field: 'restockReasons',
      expectedValue: 'Something else',
      expectedHref: `/destination/restocking-additional-info-reason${redirect}`
    },
    {
      field: 'restockAdditionalInfo',
      expectedValue: 'Other restocking reason',
      expectedHref: `/destination/restocking-additional-info-reason-other${redirect}`
    },
    {
      field: 'additionalInfo',
      expectedValue: '',
      expectedHref: `/destination/any-additional-info${redirect}`
    }
  ]

  testCases.forEach(
    ({ field, expectedValue, expectedHref, useRegex = false }) => {
      it(`Should verify the value and href of ${field} row`, async () => {
        await validateElementVisibleAndText(
          await destinationAnswersPage.getValue(field),
          expectedValue,
          useRegex
        )
        await validateHrefOfElement(
          await destinationAnswersPage.getChangeLink(field),
          expectedHref
        )
      })
    }
  )

  it('Should verify continue takes you to task list', async () => {
    await destinationAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
