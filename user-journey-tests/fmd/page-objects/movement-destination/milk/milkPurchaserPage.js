import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What company are you selling your milk to?'

class MilkPurchaserPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'companySellingMilkTo',
      noInputError: 'Enter the name of the company you are selling the milk to'
    })
  }

  pagePath = 'fmd/movement-destination/milk-selling-company-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new MilkPurchaserPage()
