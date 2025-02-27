import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'peopleDisinfection'
const pageHeadingAndTitle =
  'What measures are staff taking to reduce the risk of spreading TB from the resident cattle?'
const noInputError =
  'Enter what measures are staff taking to reduce the risk of spreading TB from the resident cattle'

class PeopleDisinfectionPage extends SingleTextInputPage {
  constructor() {
    super({ pageId, noInputError })
  }

  pagePath = 'biosecurity/people-disinfection'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle
}

export default new PeopleDisinfectionPage()
