import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class OriginCheckAnswersPage extends AnswersBasePage {
  pagePath = 'origin/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    onOffFarm: '[data-testid="onOffFarm-change-link"]',
    originType: '[data-testid="originType-change-link"]',
    parishNumber: '[data-testid="cphNumber-change-link"]',
    address: '[data-testid="address-change-link"]'
  }
}

export default new OriginCheckAnswersPage()
