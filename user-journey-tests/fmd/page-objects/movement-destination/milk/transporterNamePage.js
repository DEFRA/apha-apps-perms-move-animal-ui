import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle =
  'What is the name of the company transporting the milk?'

class TransporterNamePage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'companyTransportingMilk',
      noInputError: 'Enter the name of the company transporting the milk'
    })
  }

  pagePath = 'fmd/movement-destination/milk-transporting-company-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new TransporterNamePage()
