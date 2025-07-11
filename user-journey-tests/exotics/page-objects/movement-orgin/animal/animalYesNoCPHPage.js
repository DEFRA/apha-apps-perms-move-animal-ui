import { YesNoRadioPage } from '../../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle =
  'Does the origin premises have a county parish holding (CPH) number?'

class AnimalYesNoCPHPage extends YesNoRadioPage {
  pagePath = 'exotics/movement-origin/animal-location/cph-yes-no'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'animalLocationHasACphNumber',
      noInputError: 'Select if the origin premises has a CPH number'
    })
  }
}

export default new AnimalYesNoCPHPage()
