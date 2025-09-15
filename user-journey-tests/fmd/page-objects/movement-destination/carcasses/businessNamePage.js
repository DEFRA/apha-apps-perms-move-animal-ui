import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the name of the destination business?'

class BusinessNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'destinationBusinessName',
      noInputError: 'Enter the name of the destination business'
    })
  }

  pagePath = 'fmd/movement-destination/business-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new BusinessNamePage()
