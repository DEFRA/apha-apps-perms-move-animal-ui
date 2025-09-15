import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What is the name of the approved abattoir?'

class AbattoirNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'abattoirName',
      noInputError: 'Enter the name of the approved abattoir'
    })
  }

  pagePath = 'fmd/movement-destination/abattoir-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new AbattoirNamePage()
