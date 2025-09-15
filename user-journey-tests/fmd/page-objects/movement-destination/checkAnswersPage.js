import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

export const movementDestinationChangeLinks = {
  abattoirName: '[data-testid="abattoirName-change-link"]',
  abattoirAddress: '[data-testid="abattoirAddress-change-link"]',
  destinationType: '[data-testid="carcassesDestinationType-change-link"]',
  applicantMovingCarcasses:
    '[data-testid="applicantMovingCarcasses-change-link"]',
  thirdPartyMovingName: '[data-testid="thirdPartyMoving-change-link"]',
  destinationBusinessName:
    '[data-testid="destinationBusinessName-change-link"]',
  destinationBusinessPhone:
    '[data-testid="destinationBusinessPhone-change-link"]',
  destinationAddressKnown:
    '[data-testid="destinationAddressKnown-change-link"]',
  removingBusinessAddress:
    '[data-testid="removingBusinessAddress-change-link"]',
  destinationHasCphNumber:
    '[data-testid="destinationHasACphNumber-change-link"]',
  destinationCphNumber: '[data-testid="cphPremises-change-link"]',
  companySellingMilkTo: '[data-testid="companySellingMilkTo-change-link"]',
  differentCompanyTransportingMilk:
    '[data-testid="differentCompanyTransportingMilk-change-link"]',
  companyTransportingMilk:
    '[data-testid="companyTransportingMilk-change-link"]',
  willMoveToTla: '[data-testid="willMoveToTla-change-link"]',
  tlaOrTcphNumber: '[data-testid="tlaOrTcphNumber-change-link"]',
  premisesType: '[data-testid="premisesType-change-link"]',
  cphDesignated: '[data-testid="cphDesignated-change-link"]',
  destinationAddress: '[data-testid="destinationAddress-change-link"]'
}

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'fmd/movement-destination/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = movementDestinationChangeLinks
}

export default new CheckAnswersPage()
