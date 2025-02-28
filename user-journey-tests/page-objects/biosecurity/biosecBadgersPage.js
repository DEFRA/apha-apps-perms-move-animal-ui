import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'badgers'
const pageHeadingAndTitle =
  'How will you reduce the risk of infection from badgers and wildlife?'
const noInputError =
  'Enter information on what measures you are taking to reduce the risk of infection from badgers and wildlife'

class BiosecBadgersPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/badgers'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new BiosecBadgersPage()
