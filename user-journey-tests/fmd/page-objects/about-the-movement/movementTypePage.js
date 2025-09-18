import { RadioButtonBasePage } from '../../../base-pages/radioButtonBasePage.js'

const pageHeadingAndTitle =
  'Which type of movement or activity does your application relate to?'

class MovementTypePage extends RadioButtonBasePage {
  pagePath = 'fmd/about-the-movement-or-activity/type'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  constructor() {
    super({
      pageId: 'movementType',
      noInputError:
        'Select the type of movement or activity your application relates to',
      valueArray: ['on-to-farm', 'off-of-farm', 'slaughter-onsite']
    })
  }
}

export default new MovementTypePage()
