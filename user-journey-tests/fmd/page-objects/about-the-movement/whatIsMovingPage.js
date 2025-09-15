import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'What are you moving?'

class WhatIsMovingPage extends RadioButtonBasePage {
  pagePath = 'fmd/about-the-movement-or-activity/what-is-moving'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'whatIsMoving',
      noInputError: 'Select what you are moving',
      valueArray: ['live-animals', 'carcasses', 'milk']
    })
  }
}

export default new WhatIsMovingPage()
