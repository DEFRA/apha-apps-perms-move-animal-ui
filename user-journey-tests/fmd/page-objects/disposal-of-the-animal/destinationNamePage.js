import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the destination’s business name?'

class DestinationNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'destinationBusinessName',
      noInputError: "Enter the destination's business name"
    })
  }

  pagePath = 'fmd/disposal-of-animals/destination-business-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new DestinationNamePage()
