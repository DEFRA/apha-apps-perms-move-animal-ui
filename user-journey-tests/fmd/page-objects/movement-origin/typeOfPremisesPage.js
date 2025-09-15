import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle = 'What type of premises is the origin?'

class TypeOfPremisesPage extends RadioButtonBasePage {
  pagePath = 'fmd/movement-origin/premises-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'premisesType',
      noInputError: 'Select the origin premises type',
      valueArray: ['farm', 'smallholding', 'another']
    })
  }
}

export default new TypeOfPremisesPage()
