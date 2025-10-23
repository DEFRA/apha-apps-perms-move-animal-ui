import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import completeBiosecurityTask from '../../helpers/testHelpers/biosecurity.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

const redirect = `?redirect_uri=/${biosecurityAnswersPage.pagePath}`

describe('Check your answers test - biosecurity', () => {
  before('Sign in and complete answers', async () => {
    await loginAndSaveSession(signInPage)
    await completeBiosecurityTask('yes', true)
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
  })

  const testCases = [
    {
      field: 'incomingCattle',
      expectedValue: 'Yes',
      expectedHref: `/biosecurity/kept-separately${redirect}`
    },
    {
      field: 'grazing',
      expectedValue: 'Yes',
      expectedHref: `/biosecurity/grazing${redirect}`
    },
    {
      field: 'lastGrazed',
      expectedValue: '2 years',
      expectedHref: `/biosecurity/last-grazed${redirect}`
    },
    {
      field: 'manureOrSlurry',
      expectedValue: 'Yes',
      expectedHref: `/biosecurity/manure-and-slurry${redirect}`
    },
    {
      field: 'separateGrazing',
      expectedValue: 'Roads create a boundary between the animals',
      expectedHref: `/biosecurity/grazing-field-how-separated${redirect}`
    },
    {
      field: 'manureDetails',
      expectedValue:
        "Manure and slurry is securely stored so domestic and wild animals can't access it",
      expectedHref: `/biosecurity/manure-and-slurry-details${redirect}`
    },
    {
      field: 'whatDisinfectant',
      expectedValue: 'Agrichlor',
      expectedHref: `/biosecurity/disinfectant${redirect}`
    },
    {
      field: 'dilution',
      expectedValue:
        'I confirm a dilution rate of 1:100 is used on the farm or premises',
      expectedHref: `/biosecurity/disinfectant-dilution${redirect}`
    },
    {
      field: 'sharedEquipment',
      expectedValue: 'Yes',
      expectedHref: `/biosecurity/equipment-any-shared${redirect}`
    },
    {
      field: 'equipmentMeasures',
      expectedValue: 'Designated disinfection points',
      expectedHref: `/biosecurity/equipment-how-minimise-contamination${redirect}`
    },
    {
      field: 'animalsHoused',
      expectedValue: 'Yes',
      expectedHref: `/biosecurity/buildings-any-shared${redirect}`
    },
    {
      field: 'minimiseContamination',
      expectedValue:
        'Cleaning and disinfecting of shared buildings before the animals arrive',
      expectedHref: `/biosecurity/buildings-how-minimise-contamination${redirect}`
    },
    {
      field: 'peopleDisinfection',
      expectedValue:
        'Dedicated clothing and personal protective equipment (PPE)',
      expectedHref: `/biosecurity/people-disinfection${redirect}`
    },
    {
      field: 'wildlifeContamination',
      expectedValue: 'None',
      expectedHref: `/biosecurity/badgers${redirect}`
    }
  ]

  testCases.forEach(({ field, expectedValue, expectedHref }) => {
    it(`Should verify the value and href of ${field} row`, async () => {
      await validateElementVisibleAndText(
        await biosecurityAnswersPage.getValue(field),
        expectedValue
      )
      await validateHrefOfElement(
        await biosecurityAnswersPage.getChangeLink(field),
        expectedHref
      )
    })
  })

  it('Should verify continue takes you to task list', async () => {
    await biosecurityAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
