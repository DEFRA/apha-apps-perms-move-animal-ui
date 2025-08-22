import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import { completeDestinationTaskOnFarmForUnrestrictedOrigin } from '../../helpers/testHelpers/destination.js'
import { destinationVariants } from '../../helpers/testHelpers/movementOrigin.js'
import destinationAnswersPage from '../../page-objects/destination/destinationAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
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
      expectedValue: 'TB restricted farm',
      expectedHref: `/destination/type-of-destination${redirect}`
    },
    {
      field: 'parishNumber',
      expectedValue: '12/123/1234',
      expectedHref: `/destination/destination-farm-cph${redirect}`
    },
    {
      field: 'address',
      expectedValue: ['123\nThe street\nN11AA', '123The streetN11AA'],
      expectedHref: `/destination/destination-farm-address${redirect}`
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

  testCases.forEach(({ field, expectedValue, expectedHref }) => {
    it(`Should verify the value and href of ${field} row`, async () => {
      const element = await destinationAnswersPage.getValue(field)

      if (Array.isArray(expectedValue)) {
        const actualValue = await element.getText()
        const normalisedValue = actualValue.replace(/\s+/g, ' ').trim()
        const normalisedExpectedValues = expectedValue.map((v) =>
          v.replace(/\s+/g, ' ').trim()
        )
        expect(normalisedExpectedValues).toContain(normalisedValue)
      } else {
        await validateElementVisibleAndText(element, expectedValue)
      }

      const linkElement = await destinationAnswersPage.getChangeLink(field)
      await validateHrefOfElement(linkElement, expectedHref)
    })
  })

  it('Should verify continue takes you to task list', async () => {
    await destinationAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
