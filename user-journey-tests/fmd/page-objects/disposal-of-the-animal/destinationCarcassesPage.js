import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the carcasses going?'

class DestinationCarcassesPage extends RadioButtonBasePage {
  pagePath = 'fmd/disposal-of-animals/carcasses-premises-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'carcassesDestination',
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

export default new DestinationCarcassesPage()
