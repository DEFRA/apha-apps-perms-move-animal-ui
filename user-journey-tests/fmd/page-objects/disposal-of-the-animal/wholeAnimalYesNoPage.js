import { YesNoRadioPage } from '../../../base-pages/yesNoRadioBase.js'

const pageHeadingAndTitle = 'Will you dispose of the whole animal?'

class WholeAnimalYesNoPage extends YesNoRadioPage {
  pagePath = 'fmd/disposal-of-animal/whole-animal'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'disposalWholeAnimal',
      noInputError: 'Select if you are disposing of the whole animal'
    })
  }
}

export default new WholeAnimalYesNoPage()
