import { selectElement } from '../helpers/page.js'
import { AnswersBasePage } from './base-pages/answersBasePage.js'

const pageHeadingAndTitle = 'Check your answers before sending your application'
const pageId = 'confirmation'

class FinalAnswersPage extends AnswersBasePage {
  pagePath = '/submit/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
  errorMessage = 'You need to tick a declaration box'

  changeLinks = {
    // Origin
    onOffFarm: '[data-testid="onOffFarm-change-link"]',
    originType: '[data-testid="originType-change-link"]',
    originParishNumber: '[data-testid="cphNumber-change-link"]',
    originAddress: '[data-testid="address-change-link"]',

    // Destination
    destinationType: '[data-testid="destinationType-change-link"]',
    destinationParishNumber: '[data-testid="destinationFarmCph-change-link"]',
    destinationAddress: '[data-testid="destinationFarmAddress-change-link"]',
    maxAnimals: '[data-testid="howManyAnimalsMaximum-change-link"]',
    reason: '[data-testid="reasonForMovement-change-link"]',
    additionalInfo: '[data-testid="additionalInfo-change-link"]',
    over75: '[data-testid="movingMoreThan75Animals-change-link"]',
    halfHerd: '[data-testid="movingMoreThanHalfExistingHerd-change-link"]',

    // Licence
    ownerName: '[data-testid="fullName-change-link"]',
    receiveMethod: '[data-testid="receiveMethod-change-link"]',
    email: '[data-testid="emailAddress-change-link"]',

    // Biosecurity
    incomingCattle: '[data-testid="keptSeparately-change-link"]',
    grazing: '[data-testid="grazing-change-link"]',
    separateGrazing: '[data-testid="grazingFieldHowSeparated-change-link"]',
    lastGrazed: '[data-testid="lastGrazed-change-link"]',
    manureOrSlurry: '[data-testid="manureAndSlurry-change-link"]',
    manureDetails: '[data-testid="manureAndSlurryDetails-change-link"]',
    roadsAndTracks: '[data-testid="roadsAndTracks-change-link"]',
    animalsHoused: '[data-testid="animalsHoused-change-link"]',
    minimiseContamination:
      '[data-testid="buildingsHowMinimiseContamination-change-link"]',
    peopleDisinfection: '[data-testid="peopleDisinfection-change-link"]',
    whatDisinfectant: '[data-testid="disinfectant-change-link"]',
    dilution: '[data-testid="dilutionRate-change-link"]',
    wildlifeContamination: '[data-testid="badgers-change-link"]',

    // Biosecurity-map
    biosecMap: '[data-testid="upload-plan-change-link"]'
  }

  fieldError() {
    return super.getErrorElement(pageId)
  }

  summaryErrorLink() {
    return super.getErrorLink(pageId)
  }

  get confirmStatementsCheckbox() {
    return $('[data-testid="confirm-checkbox"]')
  }

  get someoneElseCheckbox() {
    return $('[data-testid="other-checkbox"]')
  }

  async selectADeclarationAndContinue(someoneElse = false) {
    if (!someoneElse) {
      await selectElement(this.confirmStatementsCheckbox, true)
    } else {
      await selectElement(this.someoneElseCheckbox, true)
    }
    await super.selectContinue()
  }

  async submissionErrorTest() {
    await super.selectContinue()
    await super.verifyErrorsOnPage(this.fieldError(), this.errorMessage)
    await super.verifySummaryErrorLink(
      this.summaryErrorLink(),
      this.confirmStatementsCheckbox
    )
  }
}

export default new FinalAnswersPage()
