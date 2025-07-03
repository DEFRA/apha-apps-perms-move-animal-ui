import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class BiosecurityAnswersPage extends AnswersBasePage {
  pagePath = 'biosecurity/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
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
    sharedEquipment:
      '[data-testid="equipmentHowMinimiseContamination-change-link"]',
    peopleDisinfection: '[data-testid="peopleDisinfection-change-link"]',
    whatDisinfectant: '[data-testid="disinfectant-change-link"]',
    dilution: '[data-testid="dilutionRate-change-link"]',
    wildlifeContamination: '[data-testid="badgers-change-link"]'
  }
}

export default new BiosecurityAnswersPage()
