import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the name of the third party moving the carcasses?'

class ThirdPartyNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'thirdPartyMoving',
      noInputError: 'Enter the name of the third party moving the carcasses'
    })
  }

  pagePath = 'fmd/movement-destination/transporting-business-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new ThirdPartyNamePage()
