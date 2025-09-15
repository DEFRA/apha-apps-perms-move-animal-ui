import { RadioButtonBasePage } from '../../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'Where are the animals going to?'

class AnimalDestinationPage extends RadioButtonBasePage {
  pagePath = 'fmd/movement-destination/premises-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'premisesType',
      noInputError: 'Select the destination premises type',
      valueArray: ['farm', 'commercial', 'smallholding', 'other']
    })
  }
}

export default new AnimalDestinationPage()
