// pageobjects/ProductLocationHasCPHPage.js
import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Are the animals you plan to move in a field?'

class AnimalsInFieldPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-origin/animals-in-field'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'areInField-error',
      noInputError: 'Select if the animals you plan to move are in a field'
    })
  }
}

export default new AnimalsInFieldPage()
