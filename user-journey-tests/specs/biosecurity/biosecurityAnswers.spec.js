import {
  validateElementVisibleAndText,
  validateHrefOfElement
} from '../../helpers/page.js'
import completeBiosecurityTask from '../../helpers/testHelpers/biosecurity.js'
import biosecurityAnswersPage from '../../page-objects/biosecurity/biosecurityAnswersPage.js'
import taskListPage from '../../page-objects/taskListPage.js'

describe('Check your answers test - biosecurity', () => {
  // eslint-disable-next-line no-undef
  before('Copmplete answers', async () => {
    await completeBiosecurityTask('yes')
    await biosecurityAnswersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify the value and href of cattle row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.incomingCattleValue,
      'Yes'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeIncomingCattleLink,
      '/biosecurity/kept-separately?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of grazing row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.grazingValue,
      'Yes'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeGrazingLink,
      '/biosecurity/grazing?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of last grazed row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.lastGrazedValue,
      '2 years'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeLastGrazedLink,
      '/biosecurity/last-grazed?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of manure or slurry', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.manureOrSlurryValue,
      'Yes'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeManureOrSlurryLink,
      '/biosecurity/manure-and-slurry?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of separated grazing row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.separateGrazingValue,
      'Separate grazing'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeSeparateGrazingLink,
      '/biosecurity/grazing-field-how-separated?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of roads and tracks row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.roadsAndTracksValue,
      'Yes'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.changeRoadsAndTracksLink,
      '/biosecurity/roads-and-tracks?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of shared buildings row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.sharedBuildingsValue,
      'Yes'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.sharedBuildingsLink,
      '/biosecurity/buildings-any-shared?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of minimise contamination row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.minimiseContaminationValue,
      'Minimise'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.minimiseContaminationLink,
      '/biosecurity/buildings-how-minimise-contamination?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of people disinfection row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.peopleDisinfectionValue,
      'People disinfection'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.peopleDisinfectionLink,
      '/biosecurity/people-disinfection?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify the value and href of what disinfectant row', async () => {
    await validateElementVisibleAndText(
      biosecurityAnswersPage.whatDisinfectantValue,
      'Batman disinfectant'
    )
    await validateHrefOfElement(
      biosecurityAnswersPage.whatDisinfectantLink,
      '/biosecurity/disinfectant?redirect_uri=/biosecurity/check-answers'
    )
  })

  it('Should verify continue takes you to task list', async () => {
    await biosecurityAnswersPage.selectContinue()
    await taskListPage.verifyPageHeadingAndTitle()
  })
})
