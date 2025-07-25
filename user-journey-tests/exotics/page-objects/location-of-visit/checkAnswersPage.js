import { AnswersBasePage } from '../../../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class CheckAnswersPage extends AnswersBasePage {
  pagePath = 'exotics/location-of-visit/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    typeOfLocation: '[data-testid="typeOfLocation-change-link"]',
    hasACphNumber: '[data-testid="hasACphNumber-change-link"]',
    cphNumber: '[data-testid="cphNumber-change-link"]',
    address: '[data-testid="address-change-link"]',
    inRpaRegisteredField: '[data-testid="inRpaRegisteredField-change-link"]',
    latitudeAndLongitude: '[data-testid="latitudeAndLongitude-change-link"]',
    isDesignatedPremises: '[data-testid="isDesignatedPremises-change-link"]',
    animalsOnPremises: '[data-testid="animalsOnPremises-change-link"]'
  }
}

export default new CheckAnswersPage()
