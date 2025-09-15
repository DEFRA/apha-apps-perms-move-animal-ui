import { SingleTextInputPage } from '../../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'Will a different company be transporting the milk?'

class MilkPurchaserPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'differentCompanyTransportingMilk',
      noInputError:
        'Select if a different company will be transporting the milk'
    })
  }

  pagePath = 'fmd/movement-destination/milk-selling-company-name'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new MilkPurchaserPage()
