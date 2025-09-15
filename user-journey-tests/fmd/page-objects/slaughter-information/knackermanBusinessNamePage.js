import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the business name of the Knackerman?'

class KnackermanBusinessNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'businessNameKnackerman',
      noInputError: "Enter the Knackerman's business name"
    })
  }

  pagePath = 'fmd/slaughter-information/knackerman-business-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new KnackermanBusinessNamePage()
