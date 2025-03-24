import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'

class BiosecurityMapAnswersPage extends AnswersBasePage {
  pagePath = 'biosecurity-map/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  changeLinks = {
    biosecMap: '[data-testid="upload-plan-change-link"]'
  }
}

export default new BiosecurityMapAnswersPage()
