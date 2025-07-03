import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle =
  'Which type of movement does your application relate to?'

class MovementTypePage extends RadioButtonBasePage {
  pagePath = 'exotics/about-the-movement/movement-type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'movementType',
      noInputError: 'Select the movement type',
      valueArray: ['onto-premises', 'off-premises', 'visit']
    })
  }
}

export { MovementTypePage }
