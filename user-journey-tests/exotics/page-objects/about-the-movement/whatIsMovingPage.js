import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'What are you moving?'

class WhatIsMovingPage extends RadioButtonBasePage {
  pagePath = 'exotics/about-the-movement/what-is-moving'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'whatIsMoving',
      noInputError: 'Select what you are moving',
      valueArray: [
        'live-animals',
        'carcasses',
        'animal-by-products-and-waste',
        'equipment',
        'bedding-and-feed',
        'other'
      ]
    })
  }
}

export default new WhatIsMovingPage()
