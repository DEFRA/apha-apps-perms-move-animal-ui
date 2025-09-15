import { RadioButtonBasePage } from '../../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the carcasses going?'

class CarcassesDestinationPage extends RadioButtonBasePage {
  pagePath = 'fmd/movement-destination/type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'carcassesDestinationType',
      noInputError: 'Select where the carcasses are going',
      valueArray: [
        'knackers-yard',
        'rendering-plant',
        'incinerator',
        'hunt-kennel',
        'somewhere-else'
      ]
    })
  }
}

export default new CarcassesDestinationPage()
