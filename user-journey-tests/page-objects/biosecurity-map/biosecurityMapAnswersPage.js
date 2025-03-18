import { AnswersBasePage } from '../base-pages/answersBasePage.js'

const pageHeadingAndTitle =
  'Check your answers before you continue your application'
const changeLinks = {
  biosecMap: '[data-testid="upload-plan-change-link"]'
}

class BiosecurityMapAnswersPage extends AnswersBasePage {
  pagePath = 'biosecurity-map/check-answers'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super(changeLinks)
  }
}

export default new BiosecurityMapAnswersPage()
