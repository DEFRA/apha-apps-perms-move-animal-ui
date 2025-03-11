import { Page } from '../page.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class BiosecurityAnswersPage extends Page {
  pagePath = 'biosecurity/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get changeIncomingCattleLink() {
    return $('[data-testid="keptSeparately-change-link"]')
  }

  get changeGrazingLink() {
    return $('[data-testid="grazing-change-link"]')
  }

  get changeSeparateGrazingLink() {
    return $('[data-testid="grazingFieldHowSeparated-change-link"]')
  }

  get changeLastGrazedLink() {
    return $('[data-testid="lastGrazed-change-link"]')
  }

  get changeManureOrSlurryLink() {
    return $('[data-testid="manureAndSlurry-change-link"]')
  }

  get changeManureDetails() {
    return $('[data-testid="manureAndSlurryDetails-change-link"]')
  }

  get changeRoadsAndTracksLink() {
    return $('[data-testid="roadsAndTracks-change-link"]')
  }

  get sharedBuildingsLink() {
    return $('[data-testid="buildingsAnyShared-change-link"]')
  }

  get minimiseContaminationLink() {
    return $('[data-testid="buildingsHowMinimiseContamination-change-link"]')
  }

  get peopleDisinfectionLink() {
    return $('[data-testid="peopleDisinfection-change-link"]')
  }

  get whatDisinfectantLink() {
    return $('[data-testid="disinfectant-change-link"]')
  }

  get changeDilutionLink() {
    return $('[data-testid="dilutionRate-change-link"]')
  }

  get wildlifeContaminationLink() {
    return $('[data-testid="badgers-change-link"]')
  }

  get incomingCattleValue() {
    return $$('.govuk-summary-list__value')[0]
  }

  get grazingValue() {
    return $$('.govuk-summary-list__value')[1]
  }

  get separateGrazingValue() {
    return $$('.govuk-summary-list__value')[2]
  }

  get lastGrazedValue() {
    return $$('.govuk-summary-list__value')[3]
  }

  get manureOrSlurryValue() {
    return $$('.govuk-summary-list__value')[4]
  }

  get manureDetailsValue() {
    return $$('.govuk-summary-list__value')[5]
  }

  get sharedBuildingsValue() {
    return $$('.govuk-summary-list__value')[6]
  }

  get minimiseContaminationValue() {
    return $$('.govuk-summary-list__value')[7]
  }

  get peopleDisinfectionValue() {
    return $$('.govuk-summary-list__value')[8]
  }

  get whatDisinfectantValue() {
    return $$('.govuk-summary-list__value')[9]
  }

  get dilutionValue() {
    return $$('.govuk-summary-list__value')[10]
  }

  get wildlifeContaminationValue() {
    return $$('.govuk-summary-list__value')[11]
  }
}

export default new BiosecurityAnswersPage()
