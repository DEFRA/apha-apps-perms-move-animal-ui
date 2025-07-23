import { SingleTextInputPage } from '../../../base-pages/singleTextInputPage.js'

const pageHeadingAndTitle = 'What animals are on the premises?'

class WhatAnimalsOnPremisesPage extends SingleTextInputPage {
  constructor() {
    super({
      pageId: 'animalsOnPremises',
      noInputError: 'Enter what animals are on the premises'
    })
  }

  pagePath = 'exotics/location-of-visit/animals-onsite'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle
}

export default new WhatAnimalsOnPremisesPage()
