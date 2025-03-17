import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'
const changeLinks = {
  onOffFarm: '[data-testid="onOffFarm-change-link"]',
  originType: '[data-testid="originType-change-link"]',
  parishNumber: '[data-testid="cphNumber-change-link"]',
  address: '[data-testid="address-change-link"]'
}

class OriginCheckAnswersPage extends AnswersBasePage {
  pagePath = 'origin/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super(changeLinks)
  }
}

export default new OriginCheckAnswersPage()
