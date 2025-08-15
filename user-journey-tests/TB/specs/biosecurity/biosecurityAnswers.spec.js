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
  // eslint-disable-next-line no-undef
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
      field: 'separateGrazing',
      expectedValue: 'Separate grazing',
      expectedHref: `/biosecurity/grazing-field-how-separated${redirect}`
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
      field: 'manureDetails',
      expectedValue: 'Manure details',
      expectedHref: `/biosecurity/manure-and-slurry-details${redirect}`
    },
    {
      field: 'animalsHoused',
      expectedValue: 'Yes',
      expectedHref: `/biosecurity/buildings-any-shared${redirect}`
    },
    {
      field: 'minimiseContamination',
      expectedValue: 'Minimise',
      expectedHref: `/biosecurity/buildings-how-minimise-contamination${redirect}`
    },
    {
      field: 'sharedEquipment',
      expectedValue: 'Designated disinfection points',
      expectedHref: `/biosecurity/equipment-how-minimise-contamination${redirect}`
    },
    {
      field: 'peopleDisinfection',
      expectedValue:
        'Dedicated clothing and personal protective equipment (PPE)',
      expectedHref: `/biosecurity/people-disinfection${redirect}`
    },
    {
      field: 'whatDisinfectant',
      expectedValue: 'autotesting2',
      expectedHref: `/biosecurity/disinfectant${redirect}`
    },
    {
      field: 'dilution',
      expectedValue: '1995',
      expectedHref: `/biosecurity/disinfectant-dilution${redirect}`
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
